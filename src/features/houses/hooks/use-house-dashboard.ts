import { useQuery } from '@tanstack/react-query';

import { HouseDashboardResponse, houseDashboardService } from '../services/house-dashboard.service';

export function useHouseDashboard(houseId: string) {
  return useQuery<HouseDashboardResponse>({
    queryKey: ['house-dashboard', houseId],
    queryFn: () => houseDashboardService.getHouseDashboard(houseId),
    enabled: !!houseId,
  });
}
