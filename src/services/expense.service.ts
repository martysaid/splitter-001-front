import { api } from '@/lib/api';
import type {
  CreateExpenseRequest,
  CreateExpenseResponse,
} from '@/features/expenses/types/expense.types';

export const expenseService = {
  async createExpense(houseId: string, data: CreateExpenseRequest): Promise<CreateExpenseResponse> {
    const response = await api.post<CreateExpenseResponse>(`/houses/${houseId}/expenses`, data);
    return response.data;
  },
};
