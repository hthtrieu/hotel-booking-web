import { all } from "redux-saga/effects";
// import AuthSaga from "@/store/auth/saga";
import ExampleSaga from "./example/saga";
import SearchHotelSaga from "@/store/hotel-search/saga";
import HotelSaga from "./hotel/saga";
export default function* rootSaga() {
  yield all([ExampleSaga(), SearchHotelSaga(), HotelSaga()]);
}
