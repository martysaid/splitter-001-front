import { createFileRoute } from '@tanstack/react-router';

import { CreateExpenseForm } from '@/features/expenses/components/create-expense-form';
import { useHouseMembers } from '@/features/expenses/hooks/use-house-members';
import PageWrapper from '@/components/layout/page-wrapper';
import { Header } from '@/components/header';
import Hero from '@/components/hero';
import MainWrapper from '@/components/layout/main-wrapper';
import { Footer } from '@/components/footer';

export const Route = createFileRoute('/houses/$id/expenses/new')({
  component: CreateExpensePage,
});

function CreateExpensePage() {
  const { id: houseId } = Route.useParams();
  const { data: members, isLoading, error } = useHouseMembers(houseId);

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
            <h2>Error loading members</h2>
          </Hero>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  if (!members || members.length === 0) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <Hero>
            <h2>No active members found</h2>
          </Hero>
        </MainWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Hero>
          <h2>Add a new expense.</h2>
        </Hero>
        <CreateExpenseForm houseId={houseId} members={members} />
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
