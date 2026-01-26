import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
// import { AuthGuard } from '@/features/auth/components/auth-guard';
import { CreateHouseForm } from '@/features/houses/components/create-house-form';
import { useCreateHouseForm } from '@/features/houses/hooks/use-create-house-form';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import Hero from '@/components/hero';
import SectionWrapper from '@/components/layout/section-wrapper';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/features/auth/components/auth-guard';

export const Route = createFileRoute('/houses/create')({
  component: CreateHousePage,
});

function CreateHousePage() {
  const { form, houseCreated, createdHouseId, onSubmit } = useCreateHouseForm();
  const navigate = useNavigate();

  const handleInviteTenant = () => {
    if (createdHouseId) {
      navigate({ to: `/houses/${createdHouseId}/invite` });
    }
  };

  const handleGoToDashboard = () => {
    navigate({ to: '/dashboard' });
  };

  if (houseCreated) {
    return (
      <AuthGuard>
        <PageWrapper>
          <Header />
          <MainWrapper>
            <Hero>
              <h2>House created successfully!</h2>
              <h2>Do you want to invite a tenant?</h2>
            </Hero>
            <SectionWrapper className="flex-grow">
              <div className="flex flex-col gap-4">
                <Button onClick={handleInviteTenant} variant="split">
                  Yes, invite tenant
                </Button>
                <Button onClick={handleGoToDashboard} variant="split">
                  No, maybe later
                </Button>
              </div>
            </SectionWrapper>
          </MainWrapper>
          <Footer />
        </PageWrapper>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <PageWrapper>
        <Header />
        <MainWrapper>
          <Hero>
            <h2>Add information about your house.</h2>
          </Hero>
          <CreateHouseForm form={form} onSubmit={onSubmit} />
        </MainWrapper>
        <Footer />
      </PageWrapper>
    </AuthGuard>
  );
}
