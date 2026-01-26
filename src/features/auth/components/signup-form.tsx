import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { useSignupForm } from '../hooks/use-signup-form';
import SectionWrapper from '@/components/layout/section-wrapper';
import FormMultiFieldWrapper from '@/components/layout/form-multi-field-wrapper';

interface SignupFormProps {
  form: ReturnType<typeof useSignupForm>['form'];
  onSubmit: ReturnType<typeof useSignupForm>['onSubmit'];
}

export const SignupForm = ({ form, onSubmit }: SignupFormProps) => {
  return (
    <SectionWrapper className="flex-grow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-14 md:gap-16"
        >
          <FormMultiFieldWrapper>
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input variant={'split'} type="text" placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input variant={'split'} type="text" placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input variant={'split'} type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </FormMultiFieldWrapper>

          <div className="flex w-full flex-col items-center">
            <div className="max-w-[0.75]">
              <p className="max-w-lg text-center text-xs text-foreground md:text-base">
                By continuing, you agree to our{' '}
                <a
                  href="/agreement"
                  className="font-semibold hover:underline hover:underline-offset-4"
                >
                  User Agreement
                </a>{' '}
                and acknowledge that you understand the{' '}
                <a
                  href="/privacy"
                  className="font-semibold hover:underline hover:underline-offset-4"
                >
                  Privacy Policy.
                </a>
              </p>
            </div>
            {form.formState.errors.root && (
              <div className="px-6 text-center text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}
          </div>
          <Button type="submit" variant="split" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Sending...' : 'Send Link'}
          </Button>
        </form>
      </Form>
    </SectionWrapper>
  );
};
