import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// import { refreshTokenApi } from "@/api/AuthApi";
import { HttpCode } from "./enums/httpCode";
//eslint-disable-next-line
import { getItem, removeItem, setItem } from "@/libs/LocalStorage";

// import { v4 } from 'uuid'

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const ACCESS_TOKEN = getItem("access_token");
  if (ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError) => {
  if (error.response?.status === HttpCode.UNAUTHORIZED) {
    removeItem("access_token");
    return Promise.reject(error);
  }
  return refreshToken(error);
};

// hàm để refresh token
const refreshToken = async (error: AxiosError) => {
  const refreshToken = getItem("refresh_token");
  if (!refreshToken) {
    // logout();
    return;
  }
  try {
    if (typeof refreshToken !== "string") {
      return;
    }
    // const response = await refreshTokenApi(refreshToken);
    // setItem("access_token", response.data?.data?.accessToken);
    // setItem("refresh_token", response.data?.data?.refreshToken);
    if (!error) {
      return;
    }
    if (!error.config) {
      return;
    }
    // error.config.headers.Authorization = `Bearer ${response.data?.data?.accessToken}`;
    return axios(error.config);
  } catch (error) {
    console.log(error);
    // logout();
    return;
  }
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);
  return axiosInstance;
}

const axiosInstance = axios.create({
  baseURL: process.env.API_SERVER_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "x-api-key": process.env.API_KEY,
    "Access-Control-Allow-Credentials": true,
    // 'x-request-id': v4(),
  },
});

export const AxiosConfig = setupInterceptorsTo(axiosInstance);
