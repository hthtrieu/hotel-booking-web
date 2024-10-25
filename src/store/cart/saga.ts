import {
  all,
  //eslint-disable-next-line
  call,
  fork,
  //eslint-disable-next-line
  put,
  takeLatest,
  //eslint-disable-next-line
  takeEvery,
} from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  addRoomTypeToCartAction,
  addRoomTypeToCartSuccessAction,
} from "./slice";
import { isFunction } from "@/libs/utils";

interface AddRoomTypeToCartPayload {
  roomType: {
    id: string;
    count: number;
    price: number;
  };
  onSuccess?: any;
  onError?: any;
}
function* watchAddRoomTypeToCart() {
  yield takeLatest(
    addRoomTypeToCartAction.type,
    function* ({
      payload,
    }: PayloadAction<AddRoomTypeToCartPayload>): Generator<any, void, any> {
      //eslint-disable-next-line
      yield put({
        type: addRoomTypeToCartSuccessAction.type,
        payload: {
          roomType: payload.roomType,
        },
      });
      if (isFunction(payload.onSuccess)) {
        payload.onSuccess();
      }
    }
  );
}

export default function* CartSaga() {
  yield all([fork(watchAddRoomTypeToCart)]);
}
