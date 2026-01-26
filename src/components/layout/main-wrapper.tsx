import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function MainWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        'flex h-full w-full flex-1 flex-col items-center gap-14 px-6 py-12 pb-24 md:gap-16 md:px-12 md:py-12 md:pb-24',
        className
      )}
    >
      {children}
    </main>
  );
}
