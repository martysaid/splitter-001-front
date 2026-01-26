import { ReactNode } from 'react';
import SectionWrapper from './layout/section-wrapper';

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <SectionWrapper>
      <>{children}</>
    </SectionWrapper>
  );
}
