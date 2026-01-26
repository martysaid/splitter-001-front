import { api } from '@/lib/api';
import type { HouseMember } from '@/features/expenses/types/expense.types';

interface GetHouseMembersResponse {
  status: string;
  data: {
    members: HouseMember[];
  };
}

export interface InviteMemberPayload {
  email: string;
  first_name: string;
  last_name: string;
  move_in_date: string;
}

export const memberService = {
  async getHouseMembers(houseId: string): Promise<HouseMember[]> {
    const response = await api.get<GetHouseMembersResponse>(`/houses/${houseId}/members`);
    return response.data.data.members;
  },

  async inviteMember(houseId: string, payload: InviteMemberPayload): Promise<void> {
    await api.post(`/houses/${houseId}/members/invite`, payload);
  },

  async deleteMember(houseId: string, memberId: string): Promise<void> {
    await api.delete(`/houses/${houseId}/members/${memberId}`);
  },
};
