import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import Hero from '@/components/hero';
import SectionWrapper from '@/components/layout/section-wrapper';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useHouses } from '@/features/houses/hooks/use-houses';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function Dashboard() {
  const { user } = useAuth();
  const { data: housesData, isLoading } = useHouses();
  const houses = housesData?.data?.houses || [];

  const userName =
    user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email || '';

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Hero>
          <h2>
            Welcome back
            <br />
            {userName}.
          </h2>
        </Hero>

        <SectionWrapper className="w-full items-start">
          <div className="flex w-full flex-col gap-4">
            <h3>Your houses</h3>

            {isLoading ? (
              <p className="text-left">Loading houses...</p>
            ) : houses.length === 0 ? (
              <p className="text-left">You don't have any houses yet.</p>
            ) : (
              <div className="space-y-6">
                {houses.map(house => (
                  <div key={house.id} className="flex items-start justify-between gap-4">
                    <div className="flex flex-1 flex-col gap-1">
                      <div>
                        {house.address_line1 && (
                          <div className="text-base text-foreground md:text-2xl">
                            {house.address_line1}
                          </div>
                        )}
                        {house.city && house.state && (
                          <div className="text-base text-foreground md:text-2xl">
                            {house.city}, {house.state}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-sm md:text-base">
                        {house.role === 'organizer' ? 'organizer' : 'member'}
                      </div>
                    </div>
                    <Button asChild variant="split">
                      <a href={`/houses/${house.id}`}>view</a>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="flex flex-col gap-4">
            <Button variant="split" asChild>
              <Link to="/houses/create">Create New House</Link>
            </Button>
            <Button variant="split" asChild>
              <Link to="/profile">Edit Your Profile</Link>
            </Button>
          </div>
        </SectionWrapper>
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
