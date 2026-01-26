import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useLoginForm } from '../hooks/use-login-form';
import SectionWrapper from '@/components/layout/section-wrapper';

interface LoginFormProps {
  form: ReturnType<typeof useLoginForm>['form'];
  onSubmit: ReturnType<typeof useLoginForm>['onSubmit'];
}

export const LoginForm = ({ form, onSubmit }: LoginFormProps) => {
  return (
    <SectionWrapper className="flex-grow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-14 md:gap-16"
        >
          <div className="flex flex-col gap-4">
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
          </div>
          <div className="flex flex-col gap-2">
            {form.formState.errors.root && (
              <Alert variant={'split_destructive'} role="status" aria-live="polite">
                <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" variant="split" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending...' : 'Send Link'}
            </Button>
          </div>
        </form>
      </Form>
    </SectionWrapper>
  );
};
