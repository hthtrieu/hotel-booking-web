import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  hotel: {},
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    //eslint-disable-next-line
    getHotelByIdAction: (state, { payload }) => {
      state.isLoading = true;
      //   state.count = payload;
    },
    getHotelByIdSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.hotel = payload.data;
    },
  },
});

export const { getHotelByIdAction, getHotelByIdSuccessAction } =
  hotelSlice.actions;

export default hotelSlice.reducer;
