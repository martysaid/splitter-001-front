import PageWrapper from '@/components/layout/page-wrapper';
import { Header } from '@/components/header';
import MainWrapper from '@/components/layout/main-wrapper';
import Hero from '@/components/hero';
import { Footer } from '@/components/footer';
import SectionWrapper from '@/components/layout/section-wrapper';

import { useMemberDashboard } from '../hooks/use-member-dashboard';
import { useMarkPaymentPaid } from '../hooks/use-mark-payment-paid';
import { MemberExpenseList } from './member-expense-list';
import { Button } from '@/components/ui/button';

interface MemberDashboardProps {
  houseId: string;
}

export function MemberDashboard({ houseId }: MemberDashboardProps) {
  const { data, isLoading, error } = useMemberDashboard(houseId);
  const { mutate: markAsPaid, isPending: isMarkingPaid } = useMarkPaymentPaid(houseId);

  const handleMarkAsPaid = (paymentId: string) => {
    markAsPaid({ paymentId });
  };

  // TODO: abstract loading / error screens
  if (isLoading) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <Hero>
            <h2>Loading...</h2>
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

  const { firstName, totalOwing, expenses } = data.data;

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Hero>
          {/* TODO: Get house name */}
          <h2>
            {firstName}, here is your dashboard for
            <br />
            Purple House
          </h2>
        </Hero>
        <Button variant={'split'}>
          <a href="/">Update your details</a>
        </Button>
        <SectionWrapper>
          <h2>Your Expenses.</h2>
          <div className="flex w-full justify-between">
            <p>Total Owing</p>
            <p>${totalOwing}</p>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="-mb-16 flex w-full justify-end">
            <small>Tap when paid</small>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <MemberExpenseList
            expenses={expenses}
            onMarkAsPaid={handleMarkAsPaid}
            isMarkingPaid={isMarkingPaid}
          />
        </SectionWrapper>
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
