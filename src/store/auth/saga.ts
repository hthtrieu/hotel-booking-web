import { all, call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

// import actions from "./action";

import {
  loginAction,
  loginActionError,
  loginActionSuccess,
  registerAction,
  registerActionError,
  registerActionSuccess,
} from "./slice";
import { loginApi, registerApi } from "@/api/AuthApi";
import { HttpCode } from "@/libs/enums/httpCode";
import { isFunction } from "@/libs/utils";

interface LoginPayload {
  data: {
    email: string;
    password: string;
  };
  onSuccess?: any;
  onError?: any;
}
function* watchLogin() {
  yield takeLatest(
    loginAction.type,
    function* ({
      payload,
    }: PayloadAction<LoginPayload>): Generator<any, void, any> {
      try {
        const response = yield call(loginApi, payload.data);
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data;
          yield put(
            loginActionSuccess({
              data: result,
            })
          );
          if (isFunction(payload.onSuccess)) {
            payload.onSuccess();
          }
        }
      } catch (error) {
        console.log("error", error);
        yield put(loginActionError());
      }
    }
  );
}

interface RegisterPayload {
  data: {
    email: string;
    name: string;
    password: string;
    phone_number: string;
    address?: string;
  };
  onSuccess?: any;
  onError?: any;
}
function* watchRegister() {
  yield takeLatest(
    registerAction.type,
    function* ({
      payload,
    }: PayloadAction<RegisterPayload>): Generator<any, void, any> {
      try {
        const response = yield call(registerApi, payload.data);
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data;
          yield put(
            registerActionSuccess({
              data: result,
            })
          );
          if (isFunction(payload.onSuccess)) {
            payload.onSuccess();
          }
        }
      } catch (error) {
        console.log("error", error);
        yield put(registerActionError());
      }
    }
  );
}

export default function* AuthSaga() {
  yield all([fork(watchLogin), fork(watchRegister)]);
}
