import { createFileRoute } from '@tanstack/react-router';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SignupForm } from '@/features/auth/components/signup-form';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import Hero from '@/components/hero';
import { useSignupForm } from '@/features/auth/hooks/use-signup-form';
import FormSent from '@/components/ui/form-sent';

export const Route = createFileRoute('/signup')({
  component: Signup,
});

function Signup() {
  const { form, emailSent, onSubmit } = useSignupForm();

  if (emailSent) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <FormSent type="signup" />
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
          <h2>Create a new account.</h2>
        </Hero>
        <SignupForm form={form} onSubmit={onSubmit} />
      </MainWrapper>
    </PageWrapper>
  );
}
