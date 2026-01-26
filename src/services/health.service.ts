import { api } from '@/lib/api';

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export const healthService = {
  async getHealth(): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  },
};
