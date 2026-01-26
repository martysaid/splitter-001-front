import { createFileRoute, Navigate } from '@tanstack/react-router';

import { AuthGuard } from '@/features/auth/components/auth-guard';
import PageWrapper from '@/components/layout/page-wrapper';
import { Header } from '@/components/header';
import MainWrapper from '@/components/layout/main-wrapper';
import Hero from '@/components/hero';
import { Footer } from '@/components/footer';
import { InviteMemberForm } from '@/features/members/components/invite-member-form';
import { useInviteMemberForm } from '@/features/members/hooks/use-invite-member-form';
import { useHouse } from '@/features/houses/hooks/use-house';

export const Route = createFileRoute('/houses/$id/invite')({
  component: InviteMemberPage,
});

function InviteMemberPage() {
  return (
    <AuthGuard>
      <InviteMemberPageContent />
    </AuthGuard>
  );
}

function InviteMemberPageContent() {
  const { id: houseId } = Route.useParams();

  // TODO: overkill to just get the house name
  const { data: houseData, isLoading, error: houseError } = useHouse(houseId);
  const { form, onSubmit, error, success, clearMessages } = useInviteMemberForm({
    houseId,
  });

  // TODO: Abstract loading
  if (isLoading) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <Hero>
            <h2>Loading invite form...</h2>
          </Hero>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  if (houseError || !houseData) {
    return <Navigate to="/dashboard" />;
  }

  const houseName = houseData.data.house.name;

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Hero>
          <h2>
            Invite someone to split expenses at <br /> {houseName}.
          </h2>
        </Hero>
        <InviteMemberForm
          form={form}
          onSubmit={onSubmit}
          error={error}
          success={success}
          clearMessages={clearMessages}
        />
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
