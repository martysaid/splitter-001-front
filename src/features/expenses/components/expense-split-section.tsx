import { UseFormReturn } from 'react-hook-form';

import type { CreateExpenseFormData } from '../schemas/create-expense-schema';
import type { HouseMember } from '../types/expense.types';
import { SPLIT_TYPES } from '../constants/expense-constants';
import { MemberSplitInput } from './member-split-input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency } from '@/lib/currency';
import { cva } from 'class-variance-authority';

interface ExpenseSplitSectionProps {
  form: UseFormReturn<CreateExpenseFormData>;
  members: HouseMember[];
  calculatedAllocations: Record<string, number>;
  splitValidationError: string | null;
  hasAttemptedSubmit: boolean;
  resetValidationError: () => void;
}

const buttonVariants = cva(
  'h-auto w-32 whitespace-nowrap rounded-full px-4 py-4 text-xs text-white hover:bg-card md:text-base',
  {
    variants: {
      variant: {
        active: 'bg-black text-white hover:bg-card',
        inactive: 'bg-grey-1 text-foreground hover:bg-grey-2',
      },
    },
  }
);

export function ExpenseSplitSection({
  form,
  members,
  calculatedAllocations,
  splitValidationError,
  hasAttemptedSubmit,
  resetValidationError,
}: ExpenseSplitSectionProps) {
  const amount = form.watch('amount') || 0;
  const splitType = form.watch('splitType');
  const memberAllocations = form.watch('memberAllocations') || {};

  if (members.length === 0) {
    return (
      <Alert variant="split_destructive" role="status" aria-live="polite">
        <AlertDescription>
          No active members in this house. Please add members before creating an expense.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <h2 className="whitespace-pre-line">{`How will you split\n${formatCurrency(amount)}?`}</h2>
      <FormField
        control={form.control}
        name="splitType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex justify-center gap-3">
                {SPLIT_TYPES.map(type => {
                  const isActive = field.value === type.value;
                  const chipLabel =
                    type.value === 'equal'
                      ? 'Equal'
                      : type.value === 'custom_percentage'
                        ? 'Custom %'
                        : 'Custom $';

                  return (
                    <Button
                      key={type.value}
                      type="button"
                      onClick={() => field.onChange(type.value)}
                      size="sm"
                      className={buttonVariants({ variant: isActive ? 'active' : 'inactive' })}
                    >
                      {chipLabel}
                    </Button>
                  );
                })}
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-4">
        {members.map(member => (
          <MemberSplitInput
            key={member.id}
            member={member}
            splitType={splitType}
            calculatedAmount={calculatedAllocations[member.id] || 0}
            value={memberAllocations[member.id]}
            // TODO: abstract?
            onChange={value => {
              form.setValue(`memberAllocations.${member.id}`, value, {
                shouldValidate: true,
              });
            }}
            onFocus={resetValidationError}
          />
        ))}
      </div>

      {splitType !== 'equal' &&
        (() => {
          const currentTotal = Object.values(memberAllocations).reduce((sum, val) => sum + val, 0);

          // Don't show until user has entered some values
          if (currentTotal === 0) return null;

          const isPercentage = splitType === 'custom_percentage';
          const target = isPercentage ? 100 : amount;

          // Format display values
          const currentDisplay = isPercentage
            ? // TODO: best practice for formatting percentages?
              `${currentTotal.toFixed(1)}%`
            : formatCurrency(currentTotal);
          const targetDisplay = isPercentage ? '100%' : formatCurrency(target);

          // Show error only if user has attempted to submit and there's a validation error
          const shouldShowError = hasAttemptedSubmit && splitValidationError;

          return (
            <Alert
              variant={shouldShowError ? 'split_destructive' : 'split'}
              role="status"
              aria-live="assertive"
            >
              <AlertDescription>
                {shouldShowError ? splitValidationError : `${currentDisplay} of ${targetDisplay}`}
              </AlertDescription>
            </Alert>
          );
        })()}
    </>
  );
}
