import SectionWrapper from '@/components/layout/section-wrapper';
import type { DashboardStats } from '../types/house-dashboard.types';

interface DashboardStatsProps {
  stats: DashboardStats;
}

export function DashboardStatsComponent({ stats }: DashboardStatsProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <SectionWrapper className="!gap-2 md:!gap-4">
      <div className="flex w-full items-center justify-between">
        <p>Total Outstanding</p>
        <p>{formatCurrency(stats.totalExpensesOutstandingAmount)}</p>
      </div>

      <div className="flex w-full items-center justify-between">
        <p>Pending Payments</p>
        <p>{stats.pendingPayments}</p>
      </div>

      <div className="flex w-full items-center justify-between">
        <p>Active Members</p>
        <p>{stats.totalMembers}</p>
      </div>
    </SectionWrapper>
  );
}
