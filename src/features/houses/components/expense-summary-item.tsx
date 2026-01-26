import { X, Check, Minus } from 'lucide-react';

import type { ExpenseSummary } from '../types/house-dashboard.types';

interface ExpenseSummaryItemProps {
  expense: ExpenseSummary;
  isLast?: boolean;
}

export function ExpenseSummaryItem({ expense }: ExpenseSummaryItemProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <div className="border-black, border-1 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-black bg-white">
            <Check className="h-3 w-3" style={{ strokeWidth: 2.5 }} />
          </div>
        );
      case 'submitted':
        return (
          <div className="border-black, border-1 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-black bg-white">
            <Minus className="h-3 w-3" style={{ strokeWidth: 2.5 }} />
          </div>
        );
      case 'pending':
      case 'overdue':
        return (
          <div className="border-black, border-1 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-black bg-white">
            <X className="h-2.5 w-2.5" style={{ strokeWidth: 2.5 }} />
          </div>
        );
      default:
        return (
          <div className="border-black, border-1 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-black bg-white">
            <X className="h-2.5 w-2.5" style={{ strokeWidth: 2.5 }} />
          </div>
        );
    }
  };

  return (
    <div className="flex w-full items-start justify-between gap-4">
      <div className="min-w-[30%]">
        <p>{expense.category}</p>
      </div>
      <div className="flex flex-grow flex-col gap-3">
        {expense.memberPayments.map((payment, index) => (
          <div key={index} className="flex items-center justify-between gap-14 border-b pb-4">
            <p className="text-sm font-normal leading-none">{payment.memberName}</p>
            {getStatusIcon(payment.status)}
          </div>
        ))}
      </div>
    </div>
  );
}
