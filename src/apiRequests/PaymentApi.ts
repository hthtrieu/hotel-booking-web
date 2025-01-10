import { AxiosConfig } from "@/libs/AxiosInstance";
const BASE_URL = process.env.API_SERVER_URL + "/payments";
interface RoomTypePayload {
  id: string;
  count: number;
  price?: number;
}

interface ReservationToPayment {
  hotel_id: string;
  name: string;
  email: string;
  phoneNumber: string;
  checkInDay: string;
  checkOutDay: string;
  paymentMethod: string;
  roomTypeReservedList: RoomTypePayload[];
  totalPrice: number;
  tax: number;
  vat: number;
}
export const getPaymentLinkApi = async (reservation: ReservationToPayment) => {
  const response = await AxiosConfig.post(`${BASE_URL}`, reservation);
  return response;
};

interface SaveInvoicePayload {
  reservation_id?: string;
  order_id: string;
  transaction_date: string;
  payment_method: string;
  reservation_code: string;
}
interface refundInvoicePayload {
  transaction_type: string;
  order_id: string;
  transaction_date: string;
  user: string;
  price: number;
}
export const saveInvoiceApi = async (data: SaveInvoicePayload) => {
  const response = await AxiosConfig.post(`${BASE_URL}/success`, data);
  return response;
};

export const getInvoiceByReservationId = async (id: string) => {
  const response = await AxiosConfig.post(`${BASE_URL}/success`, id);
  return response;
};

export const refundInvoiceApi = async (data: refundInvoicePayload) => {
  const response = await AxiosConfig.post(`${BASE_URL}/refund`, data);
  return response;
};
