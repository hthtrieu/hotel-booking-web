import { AxiosConfig } from "@/libs/AxiosInstance";
const BASE_URL = process.env.API_SERVER_URL + "/user";

export const getProfileApi = async () => {
  const response = await AxiosConfig.get(`${BASE_URL}/profile`);
  return response;
};

export const getUserReservationApi = async (status: string|"") => {
  const response = await AxiosConfig.get(`${BASE_URL}/reservations`, {
    params:{
      "status": status
    }
  });
  return response;
};
