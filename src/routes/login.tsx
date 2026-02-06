import { createFileRoute } from '@tanstack/react-router';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoginForm } from '@/features/auth/components/login-form';
import MainWrapper from '@/components/layout/main-wrapper';
import PageWrapper from '@/components/layout/page-wrapper';
import Hero from '@/components/hero';
import { useLoginForm } from '@/features/auth/hooks/use-login-form';
import FormSent from '@/components/ui/form-sent';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  const { form, emailSent, onSubmit } = useLoginForm();

  if (emailSent) {
    return (
      <PageWrapper>
        <Header />
        <MainWrapper>
          <FormSent type="login" email={form.getValues('email')} />
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
          <h2>Log in to your account.</h2>
        </Hero>
        <LoginForm form={form} onSubmit={onSubmit} />
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
}
