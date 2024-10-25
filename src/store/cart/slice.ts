import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItem, setItem, removeItem } from "@/libs/LocalStorage";

// Define the type for roomType
interface RoomType {
  id: string;
  name: string;
  price: number;
  images?: any[];
  adult_count: number;
  children_count: number;
  amenities: any[];
  rooms: any[];
}

// Define the state type
interface CartState {
  isLoading: boolean;
  hotelInfo: any;
  cart: RoomType[] | any;
}

const initialState: CartState = {
  isLoading: false,
  hotelInfo: getItem("hotel") || null,
  cart: getItem("cart") || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //eslint-disable-next-line
    addRoomTypeToCartAction: (state, { payload }) => {
      state.isLoading = true;
    },
    addRoomTypeToCartSuccessAction: (
      state,
      { payload }: PayloadAction<{ roomType: RoomType }>
    ) => {
      state.isLoading = false;
      const existingIndex = state.cart.findIndex(
        (item: any) => item.id === payload.roomType.id
      );

      if (existingIndex !== -1) {
        state.cart[existingIndex] = payload.roomType;
      } else {
        state.cart.push(payload.roomType);
      }

      // Cập nhật localStorage
      setItem("cart", state.cart);
    },
    resetCart: (state) => {
      state.cart = [];
      state.hotelInfo = null;

      // Xóa dữ liệu khỏi localStorage
      removeItem("cart");
      removeItem("hotel");
    },
    initCart: (state, { payload }: PayloadAction<{ hotel: any }>) => {
      state.cart = [];
      state.hotelInfo = payload.hotel;

      // Cập nhật localStorage
      setItem("hotel", payload.hotel);
      removeItem("cart");
    },
  },
});

export const {
  addRoomTypeToCartAction,
  addRoomTypeToCartSuccessAction,
  resetCart,
  initCart,
} = cartSlice.actions;

export default cartSlice.reducer;
