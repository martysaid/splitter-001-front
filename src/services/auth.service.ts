import { api } from '@/lib/api';

export interface MagicLinkRequest {
  email: string;
  name?: string;
}

export interface MagicLinkResponse {
  status: string;
  message: string;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: 'organizer' | 'tenant' | 'admin';
      created_at: string;
      updated_at: string;
    };
    token: string;
    isNewOrganizer: boolean;
  };
}

export interface LogoutResponse {
  status: string;
  message: string;
}

export interface SignupRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export interface SignupResponse {
  status: string;
  message: string;
}

export const authService = {
  async requestMagicLink(data: MagicLinkRequest): Promise<MagicLinkResponse> {
    const response = await api.post<MagicLinkResponse>('/auth/magic-link', data);
    return response.data;
  },

  async verifyToken(data: VerifyTokenRequest): Promise<VerifyTokenResponse> {
    const response = await api.post<VerifyTokenResponse>('/auth/verify', data);
    return response.data;
  },

  async logout(): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>('/auth/logout');
    return response.data;
  },

  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await api.post<SignupResponse>('/auth/signup', data);
    return response.data;
  },
};
