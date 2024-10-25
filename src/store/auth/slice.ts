import { getItem, setItem } from "@/libs/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

// import { getItem, removeItem, setItem } from '@/lib/LocalStorage';

const initialState = {
  isLoading: false,
  token: getItem("access_token") || "",
  //   refresh_token: getItem('refresh_token') || '',
  loggedIn: !!getItem("access_token"),
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //eslint-disable-next-line
    loginAction: (state, { payload }) => {
      state.isLoading = true;
      //   state.loggedIn = false;
    },
    //eslint-disable-next-line
    loginActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      setItem("access_token", payload.data.access_token);
      //   setItem("refresh_token", payload.data.access_token);
      state.token = String(payload.data.access_token);
      //   state.refresh_token = String(payload.data.refresh_token);
      state.loggedIn = true;
    },

    loginActionError: (state) => {
      state.isLoading = false;
      //   state.loggedIn = false;
    },

    //eslint-disable-next-line
    registerAction: (state, { payload }) => {
      state.isLoading = true;
    },

    //eslint-disable-next-line
    registerActionSuccess: (state, { payload }) => {
      state.isLoading = false;
    },

    //eslint-disable-next-line
    registerActionError: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  loginAction,
  loginActionSuccess,
  loginActionError,
  registerAction,
  registerActionSuccess,
  registerActionError,
} = authSlice.actions;

export default authSlice.reducer;
