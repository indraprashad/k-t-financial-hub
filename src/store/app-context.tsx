import React, { createContext } from 'react';

export interface UserState {
  authenticated: boolean;
  token?: string;
  [key: string]: any;
}

export interface AppState {
  user: UserState;
  notifyMessage?: any;
  loader?: any;
  loaderState?: boolean;
  commonUpdate?: { change: boolean };
}

export const StateContext = createContext<AppState | null>(null);
export const DispatchContext = createContext(null);