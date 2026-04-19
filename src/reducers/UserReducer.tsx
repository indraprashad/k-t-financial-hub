import { UserState } from '@/store/app-context';

export const userReducer = (state: UserState, action: { type: any; payload: any; }): UserState => {
  switch (action.type) {
    case 'LOGIN':
      return {authenticated: true, ...action.payload};
    case 'LOGOUT':
      return { authenticated: false };
    default:
      return state;
  }
};

const initialUser: UserState = {
  authenticated: false,
  token: JSON.parse(localStorage.getItem('token') || 'null'),
  ...(JSON.parse(localStorage.getItem('user') || '{}'))
};
initialUser.authenticated = !!initialUser.token;
export {initialUser};
