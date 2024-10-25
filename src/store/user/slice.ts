// import { getItem, setItem } from "@/libs/LocalStorage";
import { ReservationDetailsType } from "@/types/ReservationDetailsType";
import { createSlice } from "@reduxjs/toolkit";

// import { getItem, removeItem, setItem } from '@/lib/LocalStorage';
interface UserState {
  // isLoading: boolean;
  profile:
    | {
        name: string;
        email: string;
        address: string;
        phone_number: string;
      }
    | any;
  reservations: ReservationDetailsType[]|[];
}
const initialState: UserState = {
  // isLoading: false,
  profile: null,
  reservations: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //eslint-disable-next-line
    getProfileAction: (state, { payload }) => {},
    //eslint-disable-next-line
    getProfileSuccessAction: (state, { payload }) => {
      state.profile = payload?.data;
    },
    //eslint-disable-next-line
    getProfileErrorAction: (state) => {
      //   state.loggedIn = false;
    },

    //eslint-disable-next-line
    getUserReservationAction: (state, { payload }) => {},
    //eslint-disable-next-line
    getUserReservationSuccessAction: (state, { payload }) => {
      state.reservations = payload?.data;
    },
    //eslint-disable-next-line
    getUserReservationErrorAction: (state) => {
      state.reservations = [];
    },
  },
});

export const {
  getProfileAction,
  getProfileSuccessAction,
  getProfileErrorAction,

  getUserReservationAction,
  getUserReservationErrorAction,
  getUserReservationSuccessAction,
} = userSlice.actions;

export default userSlice.reducer;
