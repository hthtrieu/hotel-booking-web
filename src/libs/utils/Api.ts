/* eslint-disable no-undef */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { getCookie } from "cookies-next";
import qs from "qs";
import { toast } from "sonner";

import { getServerTranslations } from "@/i18n";
import { fallbackLng, languageCookie } from "@/i18n/i18nConfig";
import factories from "@/store/auth/factory";
import { setAuthCookies } from "@/store/auth/slice";
import Constants from "@/utils/Constants";
import { getValidAuthTokens } from "@/utils/Cookies";

interface RequestOptions extends AxiosRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

const requestSuccessHandler = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const { accessToken } = getValidAuthTokens();
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  const lang = (getCookie(languageCookie) as string) ?? fallbackLng;
  config.headers = config.headers || {};
  config.headers["lang"] = lang.toUpperCase();
  return config;
};

const requestErrorHandler = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const responseSuccessHandler = (response: AxiosResponse): any => {
  const { data } = response;
  return data;
};

const responseErrorHandler = async (error: AxiosError): Promise<any> => {
  if (error.code === "ERR_NETWORK") {
    const locale = (getCookie(languageCookie) as string) ?? fallbackLng;
    const { t } = await getServerTranslations(locale);
    toast.error(t("server_internal_error"));
  }
  if (
    error &&
    error.response?.status === Constants.CODE_RESPONSE_TO_CALL_REFRESH_TOKEN
  ) {
    const { refreshToken } = getValidAuthTokens();
    if (refreshToken) {
      try {
        const { data } = await factories.refreshToken({ refreshToken });
        error.config.headers = {
          ...error.config.headers,
          Authorization: `Bearer ${data.accessToken}`,
        };
        setAuthCookies(data);
        return axios(error.config);
      } catch (err: any) {
        toast.error(err.response?.data?.error?.message);
      }
    }
  }
  return await Promise.reject(error);
};

const coreApi = axios.create({
  baseURL: Constants.AXIOS_INSTANCE.CORE.VALUE,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

coreApi.interceptors.request.use(requestSuccessHandler, requestErrorHandler);
coreApi.interceptors.response.use(responseSuccessHandler, responseErrorHandler);

const chatApi = axios.create({
  baseURL: Constants.AXIOS_INSTANCE.CHAT.VALUE,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// chatApi.interceptors.request.use(requestSuccessHandler, requestErrorHandler);
// chatApi.interceptors.response.use(responseSuccessHandler, responseErrorHandler);

const apiInstance: Record<string, typeof coreApi> = {
  [Constants.AXIOS_INSTANCE.CORE.KEY]: coreApi,
  //   [Constants.AXIOS_INSTANCE.CHAT.KEY]: chatApi,
};

export const requests = (
  instance: string = Constants.AXIOS_INSTANCE.CORE.KEY
) => {
  return {
    delete: (endpoint: string, options: RequestOptions = {}) => {
      const headers = options && options.headers ? { ...options.headers } : {};

      return apiInstance[instance].request({
        url: endpoint,
        ...options,
        headers: {
          ...headers,
        },
        method: "DELETE",
      });
    },

    get: (endpoint: string, options: RequestOptions = {}) => {
      let query = "";
      if (options.params) {
        query = qs.stringify(options.params, {
          addQueryPrefix: true,
          skipNulls: true,
        });
        delete options.params;
      }
      return apiInstance[instance].request({
        url: `${endpoint}${query}`,
        method: "GET",
        ...options,
      });
    },

    patch: (endpoint: string, options: RequestOptions = {}) => {
      const headers = options && options.headers ? { ...options.headers } : {};

      return apiInstance[instance].request({
        url: endpoint,
        ...options,
        headers: {
          ...headers,
        },
        method: "PATCH",
      });
    },

    post: (endpoint: string, options: RequestOptions = {}) => {
      const headers = options && options.headers ? { ...options.headers } : {};

      return apiInstance[instance].request({
        url: endpoint,
        ...options,
        headers: {
          ...headers,
        },
        method: "POST",
      });
    },

    put: (endpoint: string, options: RequestOptions = {}) => {
      const headers = options && options.headers ? { ...options.headers } : {};

      return apiInstance[instance].request({
        url: endpoint,
        ...options,
        headers: {
          ...headers,
        },
        method: "PUT",
      });
    },
  };
};
