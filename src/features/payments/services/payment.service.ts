import { api } from '@/lib/api';
import {
  type CreateCheckoutSessionRequest,
  type CreateCheckoutSessionResponse,
  type CheckoutSessionStatusResponse,
} from '@/features/payments/types/payment.types';

export const paymentService = {
  async createCheckoutSession(
    data: CreateCheckoutSessionRequest
  ): Promise<CreateCheckoutSessionResponse> {
    const response = await api.post<CreateCheckoutSessionResponse>(
      '/payments/create-checkout-session',
      data
    );
    return response.data;
  },

  async getCheckoutSession(sessionId: string): Promise<CheckoutSessionStatusResponse> {
    const response = await api.get<CheckoutSessionStatusResponse>(`/payments/session/${sessionId}`);
    return response.data;
  },

  redirectToCheckout(url: string): void {
    window.location.href = url;
  },
};
