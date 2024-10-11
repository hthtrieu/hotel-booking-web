import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  hotelsList: [],
  pagination: {
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
  },
};

const hotelSearchSlice = createSlice({
  name: "hotel-search",
  initialState,
  reducers: {
    // //eslint-disable-next-line
    // saveFilter: (state, { payload }) => {
    //   state.isLoading = true;
    //   //   state.count = payload;
    // },

    //eslint-disable-next-line
    searchHotelAction: (state, { payload }) => {
      state.isLoading = true;
    },
    searchHotelSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.hotelsList = payload.data;
      state.pagination = payload.pagination;
    },

    //eslint-disable-next-line
    searchHotelErrorAction: (state, { payload }) => {
      state.isLoading = false;
      state.hotelsList = [];
    },
  },
});

export const {
  searchHotelAction,
  searchHotelSuccessAction,
  searchHotelErrorAction,
} = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;
