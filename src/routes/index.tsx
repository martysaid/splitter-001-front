import { createFileRoute, Navigate } from '@tanstack/react-router';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Landing } from '@/components/landing/landing';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Landing />
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
