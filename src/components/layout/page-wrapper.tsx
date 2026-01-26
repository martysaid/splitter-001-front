import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col">{children}</div>;
}
