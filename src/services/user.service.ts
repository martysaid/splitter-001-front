import { api } from '@/lib/api';
import { User } from '@/features/auth/types/auth.types';

export interface GetCurrentUserResponse {
  status: string;
  data: {
    user: User;
  };
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
}

export interface UpdateProfileResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
}

export interface EmailChangeRequest {
  newEmail: string;
}

export interface EmailChangeRequestResponse {
  status: string;
  message: string;
}

export interface EmailChangeVerifyRequest {
  token: string;
}

export interface EmailChangeVerifyResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export const userService = {
  async getCurrentUser(): Promise<GetCurrentUserResponse> {
    const response = await api.get<GetCurrentUserResponse>('/users/me');
    return response.data;
  },

  async updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    const response = await api.patch<UpdateProfileResponse>('/users/me', data);
    return response.data;
  },

  async requestEmailChange(data: EmailChangeRequest): Promise<EmailChangeRequestResponse> {
    const response = await api.post<EmailChangeRequestResponse>('/users/me/email-change', data);
    return response.data;
  },

  async verifyEmailChange(data: EmailChangeVerifyRequest): Promise<EmailChangeVerifyResponse> {
    const response = await api.post<EmailChangeVerifyResponse>('/users/email-change/verify', data);
    return response.data;
  },
};
