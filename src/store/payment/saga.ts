//eslint-disable-next-line
import {
  all,
  //eslint-disable-next-line
  call,
  fork,
  //eslint-disable-next-line
  put,
  //eslint-disable-next-line
  takeLatest,
  takeEvery,
} from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getPaymentLinkAction,
  refundInvoiceAction,
  refundInvoiceSuccessAction,
  saveInvoiceAction,
  saveInvoiceSuccessAction,
} from "./slice";
import {
  getInvoiceByReservationId,
  getPaymentLinkApi,
  refundInvoiceApi,
  saveInvoiceApi,
} from "@/api/PaymentApi";
import { HttpCode } from "@/libs/enums/httpCode";
import { isFunction } from "@/libs/utils";
import { setItem } from "@/libs/LocalStorage";

interface RoomTypePayload {
  id: string;
  count: number;
  price?: number;
}

interface ReservationToPaymentPayload {
  reservation: {
    reservation_id?: string;
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
  };
  onSuccess?: any;
  onError?: any;
}
function* watchGetPaymentLink() {
  yield takeEvery(
    getPaymentLinkAction.type,
    function* ({
      payload,
    }: PayloadAction<ReservationToPaymentPayload>): Generator<any, void, any> {
      //   const { onSuccess, onError, data } = payload;

      try {
        const response = yield call(getPaymentLinkApi, payload?.reservation);
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data;
          if (result?.reservation_id) {
            const reservation = {
              ...payload.reservation,
              reservation_id: result?.reservation_id,
            };
            setItem("reservation", reservation);
          }
          if (result?.vnp_url) {
            if (isFunction(payload.onSuccess)) {
              payload.onSuccess(result?.vnp_url);
            }
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  );
}

interface SaveInvoicePayload {
  data: {
    reservation_id?: string;
    order_id: string;
    transaction_date: string;
    payment_method: string;
    reservation_code: string;
  };
  onSuccess?: any;
  onError?: any;
}
function* watchSaveInvoice() {
  yield takeLatest(
    saveInvoiceAction.type,
    function* ({
      payload,
    }: PayloadAction<SaveInvoicePayload>): Generator<any, void, any> {
      //   const { onSuccess, onError, data } = payload;

      try {
        const response = yield call(saveInvoiceApi, payload?.data);
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data?.item;
          yield put(
            saveInvoiceSuccessAction({
              data: {
                ...result,
              },
            })
          );
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  );
}
interface getPaymentByReservationIdPayload {
  reservationId: string;
  onSuccess: any;
  onError: any;
}
function* watchGetInvoice() {
  yield takeEvery(
    getPaymentLinkAction.type,
    function* ({
      payload,
    }: PayloadAction<getPaymentByReservationIdPayload>): Generator<
      any,
      void,
      any
    > {
      //   const { onSuccess, onError, data } = payload;
      try {
        const response = yield call(
          getInvoiceByReservationId,
          payload?.reservationId
        );
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          // const result = response.data?.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  );
}

interface refundInvoicePayload {
  data: {
    transaction_type: string;
    order_id: string;
    transaction_date: string;
    user: string;
    price: number;
  };
  onSuccess: any;
  onErrorr: any;
}

function* watchRefundInvoice() {
  yield takeLatest(
    refundInvoiceAction.type,
    function* ({
      payload,
    }: PayloadAction<refundInvoicePayload>): Generator<any, void, any> {
      //   const { onSuccess, onError, data } = payload;
      try {
        const response = yield call(refundInvoiceApi, payload.data);
        console.log("response", response);
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data?.item;
          yield put(
            refundInvoiceSuccessAction({
              data: {
                ...result,
              },
            })
          );
          if (isFunction(payload?.onSuccess)) {
            payload?.onSuccess();
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  );
}
export default function* PaymentSaga() {
  yield all([
    fork(watchGetPaymentLink),
    fork(watchSaveInvoice),
    fork(watchGetInvoice),
    fork(watchRefundInvoice),
  ]);
}
