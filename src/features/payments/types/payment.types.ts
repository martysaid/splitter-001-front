export interface CheckoutSession {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email?: string;
  metadata?: Record<string, string>;
}

export interface CreateCheckoutSessionRequest {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface CreateCheckoutSessionResponse {
  status: string;
  data: {
    sessionId: string;
    url: string;
  };
}

export interface CheckoutSessionStatusResponse {
  status: string;
  data: {
    session: CheckoutSession;
  };
}
