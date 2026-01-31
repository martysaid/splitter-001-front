import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import MainWrapper from "@/components/layout/main-wrapper";
import PageWrapper from "@/components/layout/page-wrapper";
import SectionWrapper from "@/components/layout/section-wrapper";
import { useAuth } from "@/features/auth/hooks/use-auth";
import Hero from "@/components/hero";

export const Route = createFileRoute("/auth/callback")({
	component: AuthCallback,
});

function AuthCallback() {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();

	const handleContinue = () => {
		navigate({ to: "/houses/create" });
	};

	return (
		<PageWrapper>
			<Header />
			<MainWrapper>
				{isLoading ? (
					<SectionWrapper>
						<h2>Loading...</h2>
					</SectionWrapper>
				) : (
					<>
						<Hero>
							<h2>Welcome{user?.firstName ? `, ${user.firstName}` : ""}! Let's set up your first house.</h2>
							<h2>You can start tracking shared expenses in just a few steps.</h2>
						</Hero>
						<SectionWrapper>
							<Button variant='split' onClick={handleContinue}>
								Continue to Setup
							</Button>
						</SectionWrapper>
					</>
				)}
			</MainWrapper>
			<Footer />
		</PageWrapper>
	);
}
