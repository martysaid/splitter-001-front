import { api } from '@/lib/api';

import type {
  MemberDashboardResponse,
  MarkPaymentAsPaidRequest,
  MarkPaymentAsPaidResponse,
} from '../types/member-dashboard.types';

export const memberDashboardService = {
  async getMemberDashboard(houseId: string): Promise<MemberDashboardResponse> {
    const response = await api.get<MemberDashboardResponse>(`/houses/${houseId}/tenant-dashboard`);
    return response.data;
  },

  async markPaymentAsPaid(
    paymentId: string,
    data: MarkPaymentAsPaidRequest = {}
  ): Promise<MarkPaymentAsPaidResponse> {
    const response = await api.post<MarkPaymentAsPaidResponse>(
      `/expense-payments/${paymentId}/mark-paid`,
      data
    );
    return response.data;
  },
};
