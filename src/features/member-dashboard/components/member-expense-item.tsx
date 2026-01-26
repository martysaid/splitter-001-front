import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { MemberExpense } from '../types/member-dashboard.types';
import { calculateDaysUntilDue } from '@/lib/date-utils';

interface MemberExpenseItemProps {
  expense: MemberExpense;
  onMarkAsPaid: (paymentId: string) => void;
  isMarkingPaid: boolean;
}

export function MemberExpenseItem({
  expense,
  onMarkAsPaid,
  isMarkingPaid,
}: MemberExpenseItemProps) {
  const isPaid = expense.paymentStatus === 'paid';

  const dueInDays = calculateDaysUntilDue(expense.dueDate);

  return (
    <div className={cn('flex w-full items-center justify-between', isPaid && 'opacity-45')}>
      <div className="flex flex-1 flex-col items-start gap-4">
        <div className="flex flex-col items-start">
          <p>{expense.expenseName}</p>
          <div>
            <p>${expense.amountOwed.toFixed(2)}</p>
          </div>
        </div>
        {!isPaid && <small>Due in {dueInDays} days</small>}
      </div>

      <div className="flex w-32 items-center gap-4">
        <Button
          onClick={() => onMarkAsPaid(expense.paymentId)}
          disabled={isMarkingPaid}
          size="sm"
          className="h-auto w-full whitespace-nowrap rounded-full px-4 py-4 text-xs text-white md:text-base"
        >
          <small>{isPaid ? 'Paid' : 'Unpaid'}</small>
        </Button>
      </div>
    </div>
  );
}
