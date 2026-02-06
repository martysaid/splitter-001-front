import { useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import SectionWrapper from '@/components/layout/section-wrapper';
import { useInviteMemberForm } from '../hooks/use-invite-member-form';
import FormMultiFieldWrapper from '@/components/layout/form-multi-field-wrapper';

interface InviteMemberFormProps {
  form: ReturnType<typeof useInviteMemberForm>['form'];
  onSubmit: ReturnType<typeof useInviteMemberForm>['onSubmit'];
  error: ReturnType<typeof useInviteMemberForm>['error'];
  clearMessages: ReturnType<typeof useInviteMemberForm>['clearMessages'];
}

export const InviteMemberForm = ({
  form,
  onSubmit,
  error,
  clearMessages,
}: InviteMemberFormProps) => {
  const [isMoveInPickerOpen, setIsMoveInPickerOpen] = useState(false);

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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant={'split'}
                        type="email"
                        placeholder="Email"
                        {...field}
                        onFocus={clearMessages}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant={'split'}
                        type="text"
                        placeholder="First Name"
                        {...field}
                        onFocus={clearMessages}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant={'split'}
                        type="text"
                        placeholder="Last Name"
                        {...field}
                        onFocus={clearMessages}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="move_in_date"
                render={({ field }) => {
                  const parsedDate =
                    field.value && !Number.isNaN(Date.parse(field.value))
                      ? new Date(field.value)
                      : undefined;

                  const handleSelect = (date?: Date) => {
                    if (!date) {
                      field.onChange('');
                      field.onBlur();
                      setIsMoveInPickerOpen(false);
                      return;
                    }

                    const formatted = date.toISOString().split('T')[0];
                    field.onChange(formatted);
                    field.onBlur();
                    setIsMoveInPickerOpen(false);
                  };

                  return (
                    <FormItem>
                      <Popover open={isMoveInPickerOpen} onOpenChange={setIsMoveInPickerOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              disabled={field.disabled}
                              className={cn(
                                'flex w-full items-center justify-between rounded-full border-0 bg-grey-1 px-6 py-4 text-left text-base font-light focus-visible:border focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 md:text-2xl',
                                !field.value && 'text-foreground/30'
                              )}
                            >
                              {parsedDate ? format(parsedDate, 'PPP') : 'Move in date'}
                              <CalendarIcon className="ml-4 h-4 w-4 text-foreground md:h-6 md:w-6" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={parsedDate}
                            onSelect={handleSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </>
          </FormMultiFieldWrapper>

          <SectionWrapper>
            <Button type="submit" variant="split" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending invite...' : 'Send Invite'}
            </Button>
          </SectionWrapper>

          {error && (
            <div className="flex w-full flex-col items-start gap-4">
              <Alert
                className="self-start"
                variant="split_destructive"
                role="status"
                aria-live="polite"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
        </form>
      </Form>
    </SectionWrapper>
  );
};
