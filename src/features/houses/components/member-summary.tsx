import SectionWrapper from '@/components/layout/section-wrapper';
import type { MemberSummary as MemberSummaryType } from '../types/house-dashboard.types';
import { MemberSummaryCard } from './member-summary-card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

interface MemberSummaryProps {
  members: MemberSummaryType[];
  houseId: string;
}

export function MemberSummary({ members, houseId }: MemberSummaryProps) {
  const navigate = useNavigate();

  const handleInviteMember = () => {
    navigate({ to: '/houses/$id/invite', params: { id: houseId } });
  };

  if (members.length === 0) {
    return (
      <SectionWrapper>
        <h2>Members.</h2>
        <p>
          There are no members in this house. You can invite members by clicking the button below.
        </p>
        <Button variant="split" onClick={handleInviteMember}>
          <div>Invite Member</div>
        </Button>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <h2>Member Summary.</h2>
      <div className="flex w-full flex-col gap-8">
        {members.map(member => (
          <MemberSummaryCard key={member.memberId} member={member} houseId={houseId} />
        ))}
      </div>
    </SectionWrapper>
  );
}
