export interface House {
  id: string;
  organizer_id: string;
  name: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postcode: string | null;
  country: string;
  default_payment_due_days: number;
  created_at: Date;
  updated_at: Date;
}
export interface DashboardStats {
  totalExpensesOutstandingAmount: number;
  totalMembers: number;
  pendingPayments: number;
}

export type MemberStatus = 'overdue' | 'owing' | 'square';

export type PaymentStatus = 'pending' | 'paid' | 'overdue';

export interface OwedExpense {
  expenseId: string;
  expenseName: string;
  category: string;
  amountOwed: number;
  dueDate: string;
  paymentStatus: PaymentStatus;
}

export interface MemberSummary {
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentReference: string;
  status: 'square' | 'owing' | 'overdue';
  totalOwed: number;
  owedExpenses: OwedExpense[];
  lastPaymentDate: string | null;
}

export interface MemberPayment {
  memberName: string;
  status: PaymentStatus;
}

export interface ExpenseSummary {
  id: string;
  category: string;
  memberPayments: MemberPayment[];
}

export interface HouseDashboardData {
  house: House;
  totalExpensesOutstandingAmount: number;
  totalMembers: number;
  pendingPayments: number;
  members: MemberSummary[];
}
