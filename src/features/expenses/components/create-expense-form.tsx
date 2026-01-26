import type { HouseMember } from '../types/expense.types';
import { useCreateExpenseForm } from '../hooks/use-create-expense-form';
import { DUE_DATE_OPTIONS } from '../constants/expense-constants';
import { ExpenseSplitSection } from './expense-split-section';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/layout/section-wrapper';
import FormMultiFieldWrapper from '@/components/layout/form-multi-field-wrapper';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CreateExpenseFormProps {
  houseId: string;
  members: HouseMember[];
}

export function CreateExpenseForm({ houseId, members }: CreateExpenseFormProps) {
  const {
    form,
    calculatedAllocations,
    splitValidationError,
    hasAttemptedSubmit,
    isSubmitting,
    onSubmit,
    resetValidationError,
  } = useCreateExpenseForm({ houseId, members });

  return (
    <Form {...form}>
      <SectionWrapper>
        <FormMultiFieldWrapper>
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input variant="split" placeholder="Expense name e.g. Electricity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex w-fit items-center">
                          <span className="pl-4 text-base text-foreground md:text-2xl">$</span>
                        </div>
                        <Input
                          variant="split"
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder="Expense total amount e.g. $75.00"
                          {...field}
                          value={field.value ?? ''}
                          onFocus={e => e.target.select()}
                          onChange={e => {
                            const value = e.target.value;
                            field.onChange(
                              value === '' ? undefined : parseFloat(value) || undefined
                            );
                          }}
                          className="z-50 pl-8" // dodge "$" placeholder text
                        />
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDateOption"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger variant="split">
                        <SelectValue placeholder="Select due date" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DUE_DATE_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </FormMultiFieldWrapper>
      </SectionWrapper>

      <SectionWrapper className="w-full [&>*]:w-full">
        <ExpenseSplitSection
          form={form}
          members={members}
          calculatedAllocations={calculatedAllocations}
          splitValidationError={splitValidationError}
          hasAttemptedSubmit={hasAttemptedSubmit}
          resetValidationError={resetValidationError}
        />

        {form.formState.errors.root?.serverError && (
          <Alert variant={'split_destructive'} role="status" aria-live="polite">
            <AlertDescription>{form.formState.errors.root.serverError.message}</AlertDescription>
          </Alert>
        )}

        <Button
          type="button"
          onClick={onSubmit}
          variant="split"
          disabled={isSubmitting || members.length === 0}
        >
          {isSubmitting ? 'Creating Expense...' : 'Create Expense'}
        </Button>
      </SectionWrapper>
    </Form>
  );
}
