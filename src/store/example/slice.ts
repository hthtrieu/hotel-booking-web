import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  count: 0,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    //eslint-disable-next-line
    incrementAction: (state, { payload }) => {
      state.isLoading = true;
      //   state.count = payload;
    },
    incrementSuccessAction: (state, { payload }) => {
      state.isLoading = false;
      state.count = payload.num;
    },
  },
});

export const { incrementAction, incrementSuccessAction } = exampleSlice.actions;

export default exampleSlice.reducer;
