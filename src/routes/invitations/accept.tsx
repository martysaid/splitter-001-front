import { createFileRoute } from '@tanstack/react-router';

import { useAcceptInvitation } from '@/features/invitations/hooks/use-accept-invitation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import SectionWrapper from '@/components/layout/section-wrapper';

interface AcceptInvitationSearchParams {
  token?: string;
}

export const Route = createFileRoute('/invitations/accept')({
  validateSearch: (search: Record<string, unknown>): AcceptInvitationSearchParams => {
    return {
      token: search.token as string,
    };
  },
  component: AcceptInvitation,
});

function AcceptInvitation() {
  const { token } = Route.useSearch();
  const { isLoading, error, isSuccess, houseName } = useAcceptInvitation({ token });

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <SectionWrapper>
          {isLoading && (
            <>
              <h2>Accepting your invitation.</h2>
              <h2>Please wait while we set up your account...</h2>
            </>
          )}

          {error && (
            <>
              <h2>Accepting your invitation failed.</h2>
              <h2 className="whitespace-pre-line">{error}</h2>
            </>
          )}

          {isSuccess && (
            <>
              <h2>Welcome!</h2>
              <h2>You have successfully joined {houseName}.</h2>
              <p className="mt-8">Redirecting to dashboard...</p>
            </>
          )}
        </SectionWrapper>
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
