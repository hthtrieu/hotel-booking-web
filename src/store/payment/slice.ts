import { setItem, getItem, removeItem } from "@/libs/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

interface InvoiceData {
  hotel: any;
  reservation: any;
  room_types: any[];
  use: any;
  invoice: any;
}
interface InvoiceState {
  isLoading: boolean;
  invoice: InvoiceData | any;
  linkVnpay: string | any;
}
const initialState: InvoiceState = {
  isLoading: false,
  linkVnpay: "",
  invoice: getItem("invoice") || null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    //eslint-disable-next-line
    getPaymentLinkAction: (state, { payload }) => {
      state.isLoading = true;
      //   state.count = payload;
    },
    getPaymentLinkSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.linkVnpay = payload.linkVnpay;
    },

    //eslint-disable-next-line
    saveInvoiceAction: (state, { payload }) => {
      state.isLoading = false;
    },
    //eslint-disable-next-line
    saveInvoiceSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.invoice = payload.data;
      setItem("invoice", state.invoice);
    },

    //eslint-disable-next-line
    getInvoiceAction: (state, { payload }) => {
      state.isLoading = false;
    },
    //eslint-disable-next-line
    getInvoiceSuccessAction: (state, { payload }) => {
      state.isLoading = false;
    },

    //eslint-disable-next-line
    refundInvoiceAction: (state, { payload }) => {
      state.isLoading = false;
    },
    //eslint-disable-next-line
    refundInvoiceSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.invoice = payload.data;
      setItem("invoice", state.invoice);
    },

    resetPaymentAction: (state) => {
      state.isLoading = false;
      state.invoice = null;
      state.linkVnpay = null;
      removeItem("invoice");
      removeItem("reservation");
    },
  },
});

export const {
  getPaymentLinkAction,
  getPaymentLinkSuccessAction,
  saveInvoiceAction,
  saveInvoiceSuccessAction,
  getInvoiceAction,
  getInvoiceSuccessAction,
  refundInvoiceAction,
  refundInvoiceSuccessAction,
  resetPaymentAction,
} = paymentSlice.actions;

export default paymentSlice.reducer;
