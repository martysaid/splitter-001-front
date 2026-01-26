import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/layout/section-wrapper';

interface DashboardActionsProps {
  houseId: string;
}

export function DashboardActions({ houseId }: DashboardActionsProps) {
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate({ to: '/houses/$id/expenses/new', params: { id: houseId } });
  };

  const handleInviteMember = () => {
    navigate({ to: '/houses/$id/invite', params: { id: houseId } });
  };

  return (
    <SectionWrapper className="!gap-4">
      <Button variant="split" onClick={handleAddExpense}>
        <div>Add an Expense</div>
      </Button>

      <Button variant="split" onClick={handleInviteMember}>
        <div>Invite a Member</div>
      </Button>
    </SectionWrapper>
  );
}
