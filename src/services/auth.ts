import baseApi from '../utils/ApiUtils';

export interface AdminProfile {
  id: string;
  type: string;
  attributes: {
    email: string;
    name: string;
    username: string;
    is_staff: boolean;
    role?: string;
    bio?: string;
    image?: {
      id: number;
      type: string;
      attributes: {
        url: string;
      };
    };
    created_at: string;
    updated_at: string;
  };
}

export interface LoginResponse {
  token: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    is_staff: boolean;
  };
}

export interface ChangePasswordResponse {
  message: string;
  token: string;
  refresh: string;
}

const AUTH_BASE = '/auth';

export const authApi = {
  login: (email: string, password: string) =>
    baseApi(`${AUTH_BASE}/login/`, 'POST', {}, { email, password }, 'json', {})
      .then(r => r.data as LoginResponse),

  logout: () =>
    baseApi(`${AUTH_BASE}/logout/`, 'POST', {}, null, 'json', {})
      .then(r => r.data),

  changePassword: (oldPassword: string, newPassword: string) =>
    baseApi(`${AUTH_BASE}/change-password/`, 'POST', {}, { old_password: oldPassword, new_password: newPassword }, 'json', {})
      .then(r => r.data as ChangePasswordResponse),

  refreshToken: (refresh: string) =>
    baseApi(`${AUTH_BASE}/refresh/`, 'POST', {}, { refresh }, 'json', {})
      .then(r => r.data as { token: string }),

  getProfile: () =>
    baseApi('/admin-profiles/me/', 'GET', {}, null, 'json', {})
      .then(r => r.data as AdminProfile),

  updateProfile: (data: { name?: string; bio?: string; avatar_url?: string }) =>
    baseApi('/admin-profiles/me/', 'PATCH', {}, data, 'json', {})
      .then(r => r.data as AdminProfile),
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

export const getToken = () => localStorage.getItem('auth_token');
