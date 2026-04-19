import { IS_LOADING, NOT_LOADING } from "./ActionTypes";

export const loaderReducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...action.payload };
    case NOT_LOADING:
      return { ...action.payload };
    default:
      return state;
  }
};

export const loaderValue = { isLoad: false };

export const loaderStateReducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "IS_NOT_LOADING":
      return action.payload;
    default:
      return state;
  }
};

export const commonReducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "STATE":
      return { ...action.payload };
    default:
      return state;
  }
};
