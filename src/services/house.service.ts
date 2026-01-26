import { api } from '@/lib/api';

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
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  house_id: string;
  stripe_customer_id: string | null;
  tier: 'free' | 'starter' | 'premium' | 'manager';
  status: 'trialing' | 'active' | 'canceled' | 'past_due' | 'unpaid';
  created_at: string;
  updated_at: string;
}

export interface CreateHouseRequest {
  name: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  default_payment_due_days?: number;
}

export interface CreateHouseResponse {
  status: string;
  data: {
    house: House;
    subscription: Subscription;
  };
}

export interface HouseWithRole extends House {
  role: 'organizer' | 'member';
  subscription: Subscription;
}

export interface GetHouseResponse {
  status: string;
  data: {
    house: HouseWithRole;
  };
}

export interface ListHousesResponse {
  status: string;
  data: {
    houses: HouseWithRole[];
  };
}

export const houseService = {
  async createHouse(data: CreateHouseRequest): Promise<CreateHouseResponse> {
    const response = await api.post<CreateHouseResponse>('/houses', data);
    return response.data;
  },

  async getHouse(houseId: string): Promise<GetHouseResponse> {
    const response = await api.get<GetHouseResponse>(`/houses/${houseId}`);
    return response.data;
  },

  async listHouses(): Promise<ListHousesResponse> {
    const response = await api.get<ListHousesResponse>('/houses');
    return response.data;
  },
};
