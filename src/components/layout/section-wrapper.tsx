import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function SectionWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(`flex w-full max-w-3xl flex-col items-center gap-14 md:gap-16`, className)}
    >
      {children}
    </section>
  );
}
