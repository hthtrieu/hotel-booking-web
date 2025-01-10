import { AxiosConfig } from "@/libs/AxiosInstance";
const BASE_URL = process.env.API_SERVER_URL + "/auth";

export const loginApi = async (data: any) => {
  const response = await AxiosConfig.post(`${BASE_URL}/login`, data);
  return response;
};

export const registerApi = async (data: any) => {
  const response = await AxiosConfig.post(`${BASE_URL}/register`, data);
  return response;
};
