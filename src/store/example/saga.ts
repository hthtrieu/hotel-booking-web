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
import { PayloadAction } from "@reduxjs/toolkit";

import { incrementAction, incrementSuccessAction } from "./slice";

interface IncrementPayload {
  num: number;
}
function* watchIncrement() {
  yield takeEvery(
    incrementAction.type,
    function* ({
      payload,
    }: PayloadAction<IncrementPayload>): Generator<any, void, any> {
      //   const { onSuccess, onError, data } = payload;
      yield put({
        type: incrementSuccessAction.type,
        payload: {
          num: payload.num,
        },
      });
    }
  );
}

export default function* ExampleSaga() {
  yield all([fork(watchIncrement)]);
}
