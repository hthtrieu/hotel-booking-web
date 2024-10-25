import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItem, setItem, removeItem } from "@/libs/LocalStorage";

// Define the type for roomType
interface UserReservationInfo {
  username: string;
  email: string;
  phone_number: string;
  note?: string | null;
}
interface CheckInOutDay {
  checkin: string;
  checkout: string;
}

// Define the state type
interface ReservationState {
  isLoading: boolean;
  userInfo: UserReservationInfo | any;
  checkInOutDay: CheckInOutDay | any;
}

const initialState: ReservationState = {
  isLoading: false,
  userInfo: getItem("userReservation") || null,
  checkInOutDay: getItem("checkInOutDay") || null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setUserInfoAction: (
      state,
      { payload }: PayloadAction<{ userInfo: UserReservationInfo }>
    ) => {
      state.isLoading = false;
      state.userInfo = payload.userInfo;
      setItem("userReservation", state.userInfo);
    },
    setCheckInOutDay: (
      state,
      { payload }: PayloadAction<{ date: CheckInOutDay }>
    ) => {
      state.isLoading = false;
      state.checkInOutDay = payload.date;
      setItem("checkInOutDay", state.checkInOutDay);
    },
    resetUserInfoReservation: (state) => {
      state.userInfo = null;
      // Remove data from localStorage
      removeItem("userReservation");
    },
  },
});

export const { setUserInfoAction, setCheckInOutDay, resetUserInfoReservation } =
  reservationSlice.actions;

export default reservationSlice.reducer;
