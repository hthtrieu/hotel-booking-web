import AuthReducer from "@/store/auth/slice";
import ExampleReducer from "@/store/example/slice";
import HotelSearchReducer from "@/store/hotel-search/slice";
import HotelReducer from "@/store/hotel/slice";
import CartReducer from "@/store/cart/slice";
import UserReservationReducer from "@/store/reservation/slice";
import PaymentReducer from "@/store/payment/slice";
import UserReducer from "@/store/user/slice";
const rootReducer = {
  Example: ExampleReducer,
  HotelSearch: HotelSearchReducer,
  Hotel: HotelReducer,
  Cart: CartReducer,
  UserReservation: UserReservationReducer,
  Payment: PaymentReducer,
  Auth: AuthReducer,
  User: UserReducer,
};

export default rootReducer;
