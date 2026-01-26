import { createFileRoute } from '@tanstack/react-router';

import { useVerifyEmailChange } from '@/features/users/hooks/use-verify-email-change';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import SectionWrapper from '@/components/layout/section-wrapper';

interface VerifyEmailSearchParams {
  token?: string;
}

export const Route = createFileRoute('/auth/verify-email')({
  validateSearch: (search: Record<string, unknown>): VerifyEmailSearchParams => {
    return {
      token: search.token as string,
    };
  },
  component: VerifyEmail,
});

function VerifyEmail() {
  const { token } = Route.useSearch();
  const { isLoading, error, isSuccess } = useVerifyEmailChange({ token });

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <SectionWrapper>
          {isLoading && (
            <>
              <h2>Verifying your new email.</h2>
              <h2>Please wait...</h2>
            </>
          )}

          {error && (
            <>
              <h2 className="whitespace-pre-line">{error}</h2>
              <p className="mt-8">Redirecting to profile...</p>
            </>
          )}

          {isSuccess && (
            <>
              <h2>Email Updated!</h2>
              <h2>Your email address has been changed successfully.</h2>
              <p className="mt-8">Redirecting to profile...</p>
            </>
          )}
        </SectionWrapper>
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
