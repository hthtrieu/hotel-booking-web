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
  searchHotelAction,
  searchHotelSuccessAction,
  // searchHotelSuccessAction,
  // searchHotelErrorAction,
} from "./slice";
import { HotelSearchApi } from "@/api/HotelSearchAPI";
import { HttpCode } from "@/libs/enums/httpCode";
interface SearchOptions {
  province: string;
  checkin: string;
  checkout: string;
  adult: number;
  children: number;
  rooms: number;
  page_size?: number;
  page_index?: number;
  hotel_star?: number;
  review?: number;
  min_price?: number;
  max_price?: number;
  onSuccess?: any;
  onError?: any;
}
function* watchSearchHotel() {
  yield takeEvery(
    searchHotelAction.type,
    function* ({
      payload,
    }: PayloadAction<SearchOptions>): Generator<any, void, any> {
      try {
        const response = yield call(HotelSearchApi, {
          province: payload.province,
          checkin: payload.checkin,
          checkout: payload.checkout,
          adult: payload.adult,
          children: payload.children,
          rooms: payload.rooms,
          review: payload.review,
          hotel_star: payload.hotel_star,
          min_price: payload.min_price,
          max_price: payload.max_price,
          page_index: payload.page_index,
          page_size: payload.page_size || 3,
        });
        if (
          response.status === HttpCode.OK &&
          response.data?.success &&
          response.data?.data
        ) {
          const result = response.data?.data;
          yield put(
            searchHotelSuccessAction({
              data: result?.data,
              pagination: {
                total: result?.total,
                current_page: result?.current_page,
                per_page: result?.per_page,
                last_page: result?.last_page,
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

export default function* SearchHotelSaga() {
  yield all([fork(watchSearchHotel)]);
}
