import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive text-destructive dark:border-destructive [&>svg]:text-destructive',
        split:
          '!w-fit self-end inline-flex whitespace-pre-line rounded-[.5rem] text-base inline-block rounded-[.5rem] bg-white border-solid border-destructive-foreground px-6 py-4 text-left text-xs font-normal tracking-wide text-destructive-foreground md:text-2xl [&>div]:text-base [&>div]:text-right md:[&>div]:text-2xl ',
        split_destructive:
          'inline-block whitespace-pre-line rounded-[.5rem] border-none text-base inline-block rounded-[.5rem] bg-destructive px-6 py-4 text-left text-xs font-normal tracking-wide text-destructive-foreground md:text-2xl [&>div]:text-base [&>div]:text-center md:[&>div]:text-2xl ',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
