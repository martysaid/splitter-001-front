import SectionWrapper from '@/components/layout/section-wrapper';
import type { ExpenseSummary as ExpenseSummaryType } from '../types/house-dashboard.types';
import { ExpenseSummaryItem } from './expense-summary-item';

interface ExpenseSummaryProps {
  expenses: ExpenseSummaryType[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  return (
    <SectionWrapper>
      <h2>Expense Summary</h2>
      <div className="flex w-full flex-col gap-10 py-4">
        {expenses.map((expense, index) => (
          <ExpenseSummaryItem
            key={expense.id}
            expense={expense}
            isLast={index === expenses.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
