//eslint-disable-next-line
import {
  all,
  //eslint-disable-next-line
  call,
  fork,
  put,
  //eslint-disable-next-line
  takeLatest,
  takeEvery,
} from "@redux-saga/core/effects";
import { HttpCode } from "@/libs/enums/httpCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { getHotelByIdApi } from "@/api/HotelAPI";
import { getHotelByIdAction, getHotelByIdSuccessAction } from "./slice";
import { isFunction } from "@/libs/utils";

interface getHotelByIdPayload {
  id: string;
  onSuccess?: any;
  onError?: any;
}
function* watchGetHotelById() {
  yield takeEvery(
    getHotelByIdAction.type,
    function* ({
      payload,
    }: PayloadAction<getHotelByIdPayload>): Generator<any, void, any> {
      try {
        const response = yield call(getHotelByIdApi, payload.id);
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data;
          yield put(
            getHotelByIdSuccessAction({
              data: result?.item,
            })
          );
          if (isFunction(payload.onSuccess)) {
            payload.onSuccess(result?.item);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  );
}

export default function* HotelSaga() {
  yield all([fork(watchGetHotelById)]);
}
