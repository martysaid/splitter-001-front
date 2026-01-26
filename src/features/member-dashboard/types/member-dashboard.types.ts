export type PaymentStatus = 'pending' | 'paid' | 'overdue';

export interface MemberExpense {
  expenseId: string;
  expenseName: string;
  category: string;
  amountOwed: number;
  dueDate: string;
  paymentId: string;
  paymentStatus: PaymentStatus;
}

export interface MemberDashboardData {
  firstName: string;
  totalOwing: number;
  expenses: MemberExpense[];
}

export interface MemberDashboardResponse {
  status: 'success';
  data: MemberDashboardData;
}

export interface MarkPaymentAsPaidRequest {
  paymentDate?: string;
  paymentMethod?: string;
  paymentReference?: string;
  notes?: string;
}
export interface MarkPaymentAsPaidResponse {
  status: 'success';
  data: {
    payment: {
      id: string;
      status: PaymentStatus;
      payment_method: string;
      payment_reference: string;
      payment_date: string;
      notes: string | null;
    };
    message: string;
  };
}
