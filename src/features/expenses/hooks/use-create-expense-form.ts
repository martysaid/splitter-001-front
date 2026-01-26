import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import { createExpenseSchema, type CreateExpenseFormData } from '../schemas/create-expense-schema';
import { expenseService } from '@/services/expense.service';
import type { HouseMember, CreateExpenseRequest, MemberAllocation } from '../types/expense.types';
import { logError } from '@/lib/error-messages';
import { toast } from '@/stores/toast.store';

interface UseCreateExpenseFormProps {
  houseId: string;
  members: HouseMember[];
}

export const useCreateExpenseForm = ({ houseId, members }: UseCreateExpenseFormProps) => {
  const navigate = useNavigate();
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const form = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      name: '',
      amount: undefined,
      category: 'electricity',
      dueDateOption: '7',
      splitType: 'equal',
      memberAllocations: {},
    },
  });

  const watchAmount = form.watch('amount');
  const watchSplitType = form.watch('splitType');
  const watchMemberAllocations = form.watch('memberAllocations');

  // Reset to equal split when amount changes
  useEffect(() => {
    if (watchAmount !== undefined && watchAmount > 0) {
      form.setValue('splitType', 'equal');
      form.setValue('memberAllocations', {});
    }
  }, [watchAmount, form]);

  // Reset hasAttemptedSubmit when user makes changes to fix validation errors
  useEffect(() => {
    if (hasAttemptedSubmit) {
      setHasAttemptedSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchAmount, watchSplitType, watchMemberAllocations]);

  // Calculate allocations based on split type
  const calculatedAllocations = useMemo(() => {
    const amount = watchAmount || 0;
    const splitType = watchSplitType;
    const memberAllocations = watchMemberAllocations || {};

    if (members.length === 0 || amount === 0) {
      return {};
    }

    if (splitType === 'equal') {
      const perMember = amount / members.length;
      return members.reduce(
        (acc, member) => {
          acc[member.id] = perMember;
          return acc;
        },
        {} as Record<string, number>
      );
    }

    if (splitType === 'custom_percentage') {
      return members.reduce(
        (acc, member) => {
          const percentage = memberAllocations[member.id] || 0;
          acc[member.id] = (percentage / 100) * amount;
          return acc;
        },
        {} as Record<string, number>
      );
    }

    if (splitType === 'custom_dollar') {
      return memberAllocations;
    }

    return {};
  }, [watchAmount, watchSplitType, watchMemberAllocations, members]);

  // Validation error message for custom splits
  const splitValidationError = useMemo(() => {
    const amount = watchAmount || 0;
    const splitType = watchSplitType;
    const memberAllocations = watchMemberAllocations || {};

    if (splitType === 'equal') return null;
    if (amount === 0) return null;

    const values = Object.values(memberAllocations);
    const sum = values.reduce((acc, val) => acc + val, 0);
    // Check if user hasn't entered any allocations for custom splits
    if (sum === 0 && (splitType === 'custom_percentage' || splitType === 'custom_dollar')) {
      const message =
        splitType === 'custom_percentage'
          ? 'Please enter percentages for all members\nPercentages must add up to 100%'
          : `Please enter amounts for all members\nAmounts must add to $${amount.toFixed(2)}`;
      return message;
    }

    if (splitType === 'custom_percentage') {
      if (Math.abs(sum - 100) > 0.01) {
        return `Percentages must add up to 100%\nCurrently ${sum.toFixed(1)}%`;
      }
    }

    if (splitType === 'custom_dollar') {
      if (Math.abs(sum - amount) > 0.01) {
        return `Split amounts must add to $${amount.toFixed(2)}\nCurrently $${sum.toFixed(2)}`;
      }
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchAmount, watchSplitType, watchMemberAllocations, hasAttemptedSubmit]);

  const createExpenseMutation = useMutation({
    mutationFn: (data: CreateExpenseRequest) => expenseService.createExpense(houseId, data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Expense created successfully',
      });
      navigate({ to: `/houses/${houseId}` });
    },
    onError: error => {
      logError('create-expense', error);
      form.setError('root.serverError', {
        type: 'manual',
        message: 'Failed to create expense. Please try again.',
      });
    },
  });

  const onSubmit = async (data: CreateExpenseFormData) => {
    // Validate split inline using the submitted data
    // TODO: This is a temporary solution to validate the split inline using the submitted data.
    // We should use the splitValidationError hook instead.
    if (data.splitType !== 'equal' && data.amount && data.amount > 0) {
      const values = Object.values(data.memberAllocations || {});
      const sum = values.reduce((acc, val) => acc + val, 0);

      if (sum === 0) {
        return;
      }

      if (data.splitType === 'custom_percentage' && Math.abs(sum - 100) > 0.01) {
        return;
      }

      if (data.splitType === 'custom_dollar' && Math.abs(sum - data.amount) > 0.01) {
        return;
      }
    }

    // Calculate due date
    const daysToAdd = parseInt(data.dueDateOption);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysToAdd);

    // Prepare member allocations
    const splitAllocations: MemberAllocation[] = members.map(member => {
      const allocation: MemberAllocation = {
        memberId: member.id,
      };

      if (data.splitType === 'custom_percentage' && data.memberAllocations) {
        allocation.percentage = data.memberAllocations[member.id] || 0;
      } else if (data.splitType === 'custom_dollar' && data.memberAllocations) {
        allocation.amount = data.memberAllocations[member.id] || 0;
      } else {
        console.log(`[onSubmit] Member ${member.id} using equal split`);
      }

      return allocation;
    });

    const requestData: CreateExpenseRequest = {
      name: data.name,
      category: data.category,
      amount: data.amount!, // Validation ensures this is defined
      dueDate: dueDate.toISOString().split('T')[0],
      splitType: data.splitType,
      splitAllocations,
    };

    createExpenseMutation.mutate(requestData);
  };

  const handleFormSubmit = () => {
    setHasAttemptedSubmit(true);
    form.handleSubmit(onSubmit)();
  };

  // TODO: naming of function and action performed doesn't make sense
  const resetValidationError = () => {
    setHasAttemptedSubmit(false);
  };

  return {
    form,
    calculatedAllocations,
    splitValidationError,
    hasAttemptedSubmit,
    isSubmitting: createExpenseMutation.isPending,
    onSubmit: handleFormSubmit,
    resetValidationError,
  };
};
