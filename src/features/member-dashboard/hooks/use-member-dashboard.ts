import { useQuery } from '@tanstack/react-query';

import type { MemberDashboardResponse } from '../types/member-dashboard.types';
import { memberDashboardService } from '../services/member-dashboard.service';

export function useMemberDashboard(houseId: string) {
  return useQuery({
    queryKey: ['member-dashboard', houseId],
    queryFn: async (): Promise<MemberDashboardResponse> => {
      return memberDashboardService.getMemberDashboard(houseId);
    },
    enabled: !!houseId,
  });
}
