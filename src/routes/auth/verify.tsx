import { createFileRoute } from '@tanstack/react-router';

import { useVerifyToken } from '@/features/auth/hooks/use-verify-token';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import SectionWrapper from '@/components/layout/section-wrapper';

interface VerifySearchParams {
  token?: string;
}

export const Route = createFileRoute('/auth/verify')({
  validateSearch: (search: Record<string, unknown>): VerifySearchParams => {
    return {
      token: search.token as string,
    };
  },
  component: Verify,
});

function Verify() {
  const { token } = Route.useSearch();
  const { isLoading, error, isSuccess } = useVerifyToken({ token });

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <SectionWrapper>
          {isLoading && (
            // TODO: Change to SCN skeleton
            <>
              <h2>Verifying your email.</h2>
              <h2>Please wait while we verify your account...</h2>
            </>
          )}

          {/* TODO: Alert component */}
          {error && (
            <>
              <h2 className="whitespace-pre-line">{error}</h2>
            </>
          )}

          {isSuccess && (
            <>
              <h2>Email Verified!</h2>
              <h2>Your account has been verified successfully.</h2>
              <p className="mt-8">Redirecting to dashboard...</p>
            </>
          )}
        </SectionWrapper>
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
