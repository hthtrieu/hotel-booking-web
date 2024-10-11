import { AxiosConfig } from "@/libs/AxiosInstance";
const BASE_URL = process.env.API_SERVER_URL + "/hotels";

export const getHotelByIdApi = async (id: string) => {
  const response = await AxiosConfig.get(`${BASE_URL}/${id}`);
  return response;
};
