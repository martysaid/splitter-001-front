import { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';
import { formatDaysUntilDue } from '@/lib/date-utils';
import type { MemberSummary } from '../types/house-dashboard.types';
import { useDeleteMember } from '../hooks/use-delete-member';
import { useTransferOrganizer } from '../hooks/use-transfer-organizer';

interface MemberSummaryCardProps {
  member: MemberSummary;
  houseId: string;
}

export function MemberSummaryCard({ member, houseId }: MemberSummaryCardProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [confirmingTransfer, setConfirmingTransfer] = useState(false);
  const deleteMember = useDeleteMember(houseId);
  const transferOrganizer = useTransferOrganizer(houseId);

  const formatCurrency = (amount: number) => {
    if (amount === null || amount === undefined) return '$0.00';
    return `$${amount.toFixed(2)}`;
  };

  const handleDeleteClick = () => {
    if (confirmingDelete) {
      deleteMember.mutate(member.memberId);
    } else {
      setConfirmingDelete(true);
    }
  };

  const handleTransferClick = () => {
    if (confirmingTransfer) {
      transferOrganizer.mutate(member.userId);
    } else {
      setConfirmingTransfer(true);
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col items-start">
        <p>
          {member.firstName} {member.lastName}
        </p>
        {confirmingDelete ? (
          <>
            <Button
              variant="split_ghost"
              className="!text-xs text-destructive-foreground hover:text-destructive-foreground/80 md:!text-base"
              onClick={handleDeleteClick}
              disabled={deleteMember.isPending}
            >
              {`yes delete, ${member.firstName}`}
            </Button>
            <Button
              variant="split_ghost"
              className="!text-xs md:!text-base"
              onClick={() => setConfirmingDelete(false)}
              disabled={deleteMember.isPending}
            >
              changed my mind
            </Button>
          </>
        ) : confirmingTransfer ? (
          <>
            <p className="text-xs text-muted-foreground md:text-sm">
              {member.firstName} will become organizer. You will become a member.
            </p>
            <Button
              variant="split_ghost"
              className="!text-xs text-destructive-foreground hover:text-destructive-foreground/80 md:!text-base"
              onClick={handleTransferClick}
              disabled={transferOrganizer.isPending}
            >
              {`yes, transfer to ${member.firstName}`}
            </Button>
            <Button
              variant="split_ghost"
              className="!text-xs md:!text-base"
              onClick={() => setConfirmingTransfer(false)}
              disabled={transferOrganizer.isPending}
            >
              changed my mind
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="split_ghost"
              className="!text-xs md:!text-base"
              onClick={handleDeleteClick}
            >
              {`delete, ${member.firstName}`}
            </Button>
            <Button
              variant="split_ghost"
              className="!text-xs md:!text-base"
              onClick={handleTransferClick}
            >
              {`transfer organizer role`}
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-grow-[.2] flex-col items-end gap-3">
        <p>{formatCurrency(member.totalOwed)}</p>
        <div className="flex w-full flex-col items-end gap-3">
          <div className="grid w-full grid-cols-2">
            {member.owedExpenses.map(expense => (
              <Fragment key={expense.expenseId}>
                <div className="text-right text-xs text-foreground md:text-base">
                  {expense.category.toLowerCase()}
                </div>
                <div className="text-right text-xs text-foreground md:text-base">
                  <span className="font-semibold">({formatDaysUntilDue(expense.dueDate)})</span>{' '}
                  {formatCurrency(expense.amountOwed)}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
