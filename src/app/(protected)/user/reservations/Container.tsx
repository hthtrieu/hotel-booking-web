"use client";
import React, { useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Constants from "@/libs/Constants";
import ReservationsList from "@/components/user/reservation/ReservationsList";
import { useDispatch, useSelector } from "react-redux";
import { getUserReservationAction } from "@/store/user/slice";
import { ReservationDetailsType } from "@/types/ReservationDetailsType";
const Container = () => {
  const { reservations } = useSelector( (state: {
      User: {
        reservations: ReservationDetailsType[]|[];
      };
    }) => state.User);
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState(
    Constants.RESERVATION_STATUS.CONFIRMED
  );

  const getReservationsList = (status: string) => {
    dispatch(
      getUserReservationAction({
        status: status,
        onSuccess: () => {},
        onError: () => {},
      })
    );
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string
  ) => {
    setStatus(newStatus);
  };
  useEffect(() => {
    if (status) {
      getReservationsList(status);
    }
  }, [status]);
  return (
    <div>
      <p className="text-2xl font-semibold">Reservation History</p>
      <p className="text-sm">Your booking history</p>
      <div className="bg-slate-200 my-4 rounded-md p-4 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p>
              Total:{" "}
              <b>{Array.isArray(reservations) ? reservations?.length : ""}</b>
            </p>
            <ToggleButtonGroup
              color="primary"
              value={status}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value={Constants.RESERVATION_STATUS.CONFIRMED}>
                {Constants.RESERVATION_STATUS.CONFIRMED}
              </ToggleButton>
              <ToggleButton value={Constants.RESERVATION_STATUS.CANCELLED}>
                {Constants.RESERVATION_STATUS.CANCELLED}{" "}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <ReservationsList data={reservations} />
        </div>
      </div>
    </div>
  );
};

export default Container;
