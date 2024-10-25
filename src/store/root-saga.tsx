import { all } from "redux-saga/effects";
// import AuthSaga from "@/store/auth/saga";
import ExampleSaga from "./example/saga";
import SearchHotelSaga from "@/store/hotel-search/saga";
import HotelSaga from "./hotel/saga";
import CartSaga from "./cart/saga";
import PaymentSaga from "./payment/saga";
import AuthSaga from "./auth/saga";
import UserSaga from "./user/saga";
export default function* rootSaga() {
  yield all([
    ExampleSaga(),
    SearchHotelSaga(),
    HotelSaga(),
    CartSaga(),
    PaymentSaga(),
    AuthSaga(),
    UserSaga(),
  ]);
}
