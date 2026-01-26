import { api } from '@/lib/api';

import type { HouseDashboardData } from '../types/house-dashboard.types';

export interface HouseDashboardResponse {
  status: 'success';
  data: HouseDashboardData;
}
export const houseDashboardService = {
  async getHouseDashboard(houseId: string): Promise<HouseDashboardResponse> {
    const response = await api.get<HouseDashboardResponse>(`/houses/${houseId}/dashboard`);
    return response.data;
  },
};
