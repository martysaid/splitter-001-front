export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'organizer' | 'tenant' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MagicLinkFormData {
  email: string;
  name?: string;
}
