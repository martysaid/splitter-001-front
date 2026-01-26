import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCreateHouseForm } from '../hooks/use-create-house-form';
import SectionWrapper from '@/components/layout/section-wrapper';
import { AUSTRALIAN_STATES, PAYMENT_DUE_DAYS_OPTIONS } from '../constants/house-constants';

interface CreateHouseFormProps {
  form: ReturnType<typeof useCreateHouseForm>['form'];
  onSubmit: ReturnType<typeof useCreateHouseForm>['onSubmit'];
}

export const CreateHouseForm = ({ form, onSubmit }: CreateHouseFormProps) => {
  return (
    <SectionWrapper className="flex-grow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-grow flex-col justify-between gap-14 md:gap-16"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input variant={'split'} type="text" placeholder="House name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_line1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input variant={'split'} type="text" placeholder="Address Line 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_line2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input variant={'split'} type="text" placeholder="Address Line 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input variant={'split'} type="text" placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger variant={'split'}>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AUSTRALIAN_STATES.map(state => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input variant={'split'} type="text" placeholder="Postcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="default_payment_due_days"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={value => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger variant={'split'}>
                        <SelectValue placeholder="Default Payment Due Days" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_DUE_DAYS_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={String(option.value)}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            {form.formState.errors.root && (
              <div className="px-6 text-center text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}
            <Button type="submit" variant="split" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </SectionWrapper>
  );
};
