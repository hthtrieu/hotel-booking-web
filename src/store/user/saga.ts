import { all, call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getProfileAction,
  getProfileSuccessAction,
  getProfileErrorAction,
  getUserReservationAction,
  getUserReservationErrorAction,
  getUserReservationSuccessAction,
} from "./slice";
import { getProfileApi, getUserReservationApi } from "@/api/UserApi";
import { HttpCode } from "@/libs/enums/httpCode";
import { isFunction } from "@/libs/utils";

interface GetProfilePayload {
  onSuccess?: any;
  onError?: any;
}
function* watchGetProfile() {
  yield takeLatest(
    getProfileAction.type,
    function* ({
      payload,
    }: PayloadAction<GetProfilePayload>): Generator<any, void, any> {
      try {
        const response = yield call(getProfileApi);
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data?.user;
          yield put(
            getProfileSuccessAction({
              data: result,
            })
          );
          if (isFunction(payload.onSuccess)) {
            payload.onSuccess();
          }
        }
      } catch (error) {
        console.log("error", error);
        yield put(getProfileErrorAction());
      }
    }
  );
}

interface GetUserReservationPayload {
  status: string;
  onSuccess?: any;
  onError?: any;
}
function* watchUserReservations() {
  yield takeLatest(
    getUserReservationAction.type,
    function* ({
      payload,
    }: PayloadAction<GetUserReservationPayload>): Generator<any, void, any> {
      try {
        const response = yield call(getUserReservationApi, payload.status);
        if (
          response?.status === HttpCode.OK &&
          response?.data?.success &&
          response?.data?.data
        ) {
          const result = response.data?.data?.data;
          console.log("result ", result?.data)
          yield put(
            getUserReservationSuccessAction({
              data: result?.reservations,
            })
          );
          if (isFunction(payload.onSuccess)) {
            payload.onSuccess();
          }
        }
        else{
          console.log(response?.data)
        }
      } catch (error) {
        console.log("error", error);
        yield put(getUserReservationErrorAction());
      }
    }
  );
}

export default function* UserSaga() {
  yield all([fork(watchGetProfile), fork(watchUserReservations)]);
}
