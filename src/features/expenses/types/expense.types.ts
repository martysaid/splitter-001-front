// TODO: remove rent category for mvp
export type ExpenseCategory =
  | 'rent'
  | 'electricity'
  | 'gas'
  | 'water'
  | 'internet'
  | 'cleaning'
  | 'maintenance'
  | 'groceries'
  | 'other';

export type AllocationType = 'equal' | 'percentage' | 'fixed';

export type SplitType = 'equal' | 'custom_percentage' | 'custom_dollar';

export interface HouseMember {
  id: string;
  user_id: string;
  house_id: string;
  is_active: boolean;
  move_in_date: string;
  move_out_date: string | null;
  bank_account_name: string;
  bank_bsb: string;
  bank_account_number: string;
  payment_reference: string;
  joined_at: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface MemberAllocation {
  memberId: string;
  amount?: number; // dollars
  percentage?: number;
}

export interface CreateExpenseRequest {
  name: string;
  description?: string;
  category: ExpenseCategory;
  amount: number; // dollars
  dueDate: string; // ISO date string
  splitType: SplitType;
  splitAllocations: MemberAllocation[];
}

export interface Expense {
  id: string;
  house_id: string;
  created_by_id: string;
  name: string;
  description: string | null;
  category: ExpenseCategory;
  amount: number; // cents
  expense_date: string;
  due_date: string;
  frequency: string;
  recurring_until: string | null;
  parent_expense_id: string | null;
  allocation_type: AllocationType;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ExpenseAllocation {
  id: string;
  expense_id: string;
  house_member_id: string;
  amount: number; // cents
  percentage: number | null;
  is_overridden: boolean;
  override_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  expense_allocation_id: string;
  house_member_id: string;
  amount: number; // cents
  status: 'pending' | 'paid' | 'overdue';
  payment_method: string;
  payment_reference: string;
  payment_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseResponse {
  status: string;
  data: {
    expense: Expense;
    allocations: ExpenseAllocation[];
    payments: Payment[];
    message: string;
  };
}
