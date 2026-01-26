import { createFileRoute } from '@tanstack/react-router';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { OrganizerDashboard } from '@/features/houses/components/house-dashboard';
import { MemberDashboard } from '@/features/member-dashboard/components/member-dashboard';
import { useHouse } from '@/features/houses/hooks/use-house';
import SectionWrapper from '@/components/layout/section-wrapper';

export const Route = createFileRoute('/houses/$id/')({
  component: HouseDashboardPage,
});

function HouseDashboardPage() {
  return (
    <AuthGuard>
      <HouseDashboardPageContent />
    </AuthGuard>
  );
}

function HouseDashboardPageContent() {
  const { id: houseId } = Route.useParams();

  // Get house data to determine role
  const { data: houseData, isLoading, error } = useHouse(houseId);

  if (!houseId) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <SectionWrapper>
            <Alert variant="split_destructive">
              <AlertTitle className="text-center">Error</AlertTitle>
              <AlertDescription>House ID is missing.</AlertDescription>
            </Alert>
            <Button variant="split" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </SectionWrapper>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  // Handle loading state
  if (isLoading) {
    // TODO: skeleton loader
    return <div>Loading...</div>;
  }

  // TODO: abstract loading / error screens
  // TODO: skeleton loader
  // Handle error or missing house data
  if (error || !houseData) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <SectionWrapper>
            <Alert variant="split_destructive">
              <AlertTitle className="text-center">House not found.</AlertTitle>
              <AlertDescription>
                The house you are looking for does not exist or you do not have permission to view
                it.
              </AlertDescription>
            </Alert>
            <Button variant="split" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </SectionWrapper>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  const isOrganizer = houseData.data.house.role === 'organizer';

  // Both dashboards fetch their own data internally
  return isOrganizer ? (
    <OrganizerDashboard houseId={houseId} />
  ) : (
    <MemberDashboard houseId={houseId} />
  );
}
