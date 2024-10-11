// import AuthReducer from "@/store/auth/slice";
import ExampleReducer from "@/store/example/slice";
import HotelSearchReducer from "@/store/hotel-search/slice";
import HotelReducer from "@/store/hotel/slice";
const rootReducer = {
  Example: ExampleReducer,
  HotelSearch: HotelSearchReducer,
  Hotel: HotelReducer,
  // Auth: AuthReducer,
};

export default rootReducer;
