import { DashboardActions } from './dashboard-actions';
import { MemberSummary } from './member-summary';
import PageWrapper from '@/components/layout/page-wrapper';
import { Header } from '@/components/header';
import MainWrapper from '@/components/layout/main-wrapper';
import Hero from '@/components/hero';
import { Footer } from '@/components/footer';
import { useHouseDashboard } from '../hooks/use-house-dashboard';
import { DashboardStatsComponent } from './dashboard-stats';

interface OrganizerDashboardProps {
  houseId: string;
}

export function OrganizerDashboard({ houseId }: OrganizerDashboardProps) {
  const { data, isLoading, error } = useHouseDashboard(houseId);

  // TODO: abstract loading / error screens
  // TODO: skeleton loader
  if (isLoading) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <Hero>
            <h2>Loading dashboard...</h2>
          </Hero>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <Hero>
            <h2>Error loading dashboard</h2>
          </Hero>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  // TODO: improve UX when no data is available
  if (!data) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <Hero>
            <h2>No data available</h2>
          </Hero>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  const dashboardData = data;
  const stats = {
    totalExpensesOutstandingAmount: dashboardData.data.totalExpensesOutstandingAmount,
    totalMembers: dashboardData.data.totalMembers,
    pendingPayments: dashboardData.data.pendingPayments,
  };

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Hero>
          <h2>
            Here is the Dashboard for {<br />} {dashboardData.data.house.name}.
          </h2>
        </Hero>
        <DashboardActions houseId={houseId} />
        <DashboardStatsComponent stats={stats} />
        <MemberSummary members={dashboardData.data.members} houseId={houseId} />
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
