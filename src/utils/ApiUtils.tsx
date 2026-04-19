import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { IS_LOADING, SNACKBAR_OPEN } from "../reducers";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 0;

interface ApiState {
  loaderState?: boolean | unknown;
  [key: string]: unknown;
}

interface DispatchAction {
  type: string;
  payload?: unknown;
}

type DispatchFn = (action: DispatchAction) => void;
type NavigateFn = (path: string) => void;

interface ApiUtilsType {
  axios: AxiosInstance;
  dispatch: DispatchFn | null;
  state: ApiState | null;
  navigate: NavigateFn | null;
}

export const ApiUtils: ApiUtilsType = {
  axios: axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 0 }),
  dispatch: null,
  state: null,
  navigate: null,
};

const changeLoaderStatus = (): void => {
  ApiUtils.dispatch?.({ type: IS_LOADING, payload: { isLoad: false } });
  ApiUtils.dispatch?.({ type: "IS_NOT_LOADING", payload: true });
};

ApiUtils.axios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token: { token?: string; access_token?: string } = JSON.parse(localStorage.getItem("token") || "{}");
    if (token?.token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    } else if (token?.access_token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    ApiUtils.dispatch?.({
      type: IS_LOADING,
      payload: { isLoad: ApiUtils.state?.loaderState },
    });
    return config;
  },
  function (error: AxiosError): Promise<never> {
    changeLoaderStatus();
    if (!error.response) {
      ApiUtils.dispatch?.({
        type: SNACKBAR_OPEN,
        payload: { isNotify: true, severity: "error", message: error.message },
      });
      return Promise.reject(error.message);
    }
    const message =
      (error.response?.data as { error?: string; errors?: string[] })?.error ||
      (error.response?.data as { errors?: string[] })?.errors?.join(", ");
    ApiUtils.dispatch?.({
      type: SNACKBAR_OPEN,
      payload: { isNotify: true, severity: "error", message },
    });
    return Promise.reject(message);
  }
);

ApiUtils.axios.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
    changeLoaderStatus();
    return response;
  },
  function (error: AxiosError): Promise<never> {
    changeLoaderStatus();
    if (!error.response) {
      ApiUtils.dispatch?.({
        type: SNACKBAR_OPEN,
        payload: { isNotify: true, severity: "error", message: error.message },
      });
      return Promise.reject(error.message);
    }
    if (error.response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      ApiUtils.dispatch?.({ type: "LOGOUT" });
      ApiUtils.navigate?.("/login");
    }
    const message =
      (error.response?.data as { error?: string; errors?: string[] })?.error ||
      (error.response?.data as { errors?: string[] })?.errors?.join(", ");
    ApiUtils.dispatch?.({
      type: SNACKBAR_OPEN,
      payload: { isNotify: true, severity: "error", message },
    });
    return Promise.reject(message);
  }
);


interface RequestParams {
  [key: string]: unknown;
}

interface RequestHeaders {
  [key: string]: string;
}

/**
 * @param url 
 * @param method
 * @param params 
 * @param data 
 * @param responseType 
 * @param headers 
 * @returns
 */
export default (
  url: string,
  method: string,
  params: RequestParams,
  data: unknown,
  responseType: string,
  headers: RequestHeaders
): Promise<AxiosResponse> =>
  ApiUtils.axios.request({
    url,
    method,
    params,
    data,
    responseType,
    headers,
  } as AxiosRequestConfig);
