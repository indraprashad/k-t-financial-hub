import { SNACKBAR_CLOSE, SNACKBAR_OPEN } from './ActionTypes';

export const snackbarReducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case SNACKBAR_OPEN:
      return { ...action.payload };
    case SNACKBAR_CLOSE:
      return { ...action.payload };
    default:
      return state;
  }
};

export const snackbarValue = { isNotify: false, severity: 'success', message: 'Network error' };
