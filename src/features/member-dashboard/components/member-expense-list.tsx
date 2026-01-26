import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { MemberExpenseItem } from './member-expense-item';
import type { MemberExpense } from '../types/member-dashboard.types';

interface MemberExpenseListProps {
  expenses: MemberExpense[];
  onMarkAsPaid: (paymentId: string) => void;
  isMarkingPaid: boolean;
}

const PAID_EXPENSES_PER_PAGE = 5;

export function MemberExpenseList({
  expenses,
  onMarkAsPaid,
  isMarkingPaid,
}: MemberExpenseListProps) {
  const [visiblePaidCount, setVisiblePaidCount] = useState(PAID_EXPENSES_PER_PAGE);

  const unpaidExpenses = expenses.filter(exp => exp.paymentStatus !== 'paid');
  const paidExpenses = expenses.filter(exp => exp.paymentStatus === 'paid');
  const visiblePaidExpenses = paidExpenses.slice(0, visiblePaidCount);
  const hasMorePaid = paidExpenses.length > visiblePaidCount;

  if (expenses.length === 0) {
    return <p>No expenses to display.</p>;
  }

  return (
    <div className="flex w-full flex-col gap-8 space-y-3">
      {unpaidExpenses.map(expense => (
        <MemberExpenseItem
          key={expense.paymentId}
          expense={expense}
          onMarkAsPaid={onMarkAsPaid}
          isMarkingPaid={isMarkingPaid}
        />
      ))}

      {visiblePaidExpenses.map(expense => (
        <MemberExpenseItem
          key={expense.paymentId}
          expense={expense}
          onMarkAsPaid={onMarkAsPaid}
          isMarkingPaid={isMarkingPaid}
        />
      ))}

      {hasMorePaid && (
        <div className="flex justify-center pt-2">
          <Button
            variant="split_ghost"
            onClick={() => setVisiblePaidCount(prev => prev + PAID_EXPENSES_PER_PAGE)}
            className="no-underline"
          >
            See more
          </Button>
        </div>
      )}
    </div>
  );
}
