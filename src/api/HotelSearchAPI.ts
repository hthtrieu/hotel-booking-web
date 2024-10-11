import { AxiosConfig } from "@/libs/AxiosInstance";
const BASE_URL = process.env.API_SERVER_URL + "/hotels";
interface HotelSearchFilterType {
  province: string;
  checkin: string;
  checkout: string;
  adult: number;
  children: number;
  rooms: number;
  page_size?: number | 6;
  page_index?: number;
  hotel_star?: number;
  review?: number;
  min_price?: number;
  max_price?: number;
}
export const HotelSearchApi = async (data: HotelSearchFilterType) => {
  const response = await AxiosConfig.get(`${BASE_URL}`, {
    params: data,
  });
  return response;
};
