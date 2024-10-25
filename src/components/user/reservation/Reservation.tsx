import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Divider } from "@mui/material";
import Constants from "@/libs/Constants";
import { formatNumberToVND, isFunction } from "@/libs/utils";
import StarIcon from "@mui/icons-material/Star";

interface UserReservationProps {
  reservation?: any;
  onClick?: any;
}
const Reservation = (props: UserReservationProps) => {
  const { hotel, reservation, invoice, room_types } = props?.reservation;
  return (
    <div
      className="flex flex-col sm:flex-row bg-gray-50 rounded-md p-2 cursor-pointer"
      onClick={() => {
        if (isFunction(props.onClick)) {
          props.onClick();
        }
      }}
    >
      {/* block left*/}
      <div className="sm:w-2/3 flex flex-col gap-2 pr-2">
        <img
          src={props.reservation?.hotel?.images?.[0]?.path}
          className="object-cover w-full max-h-52"
        />
        <div>
          <div className="flex justify-between items-start flex-col">
            <p className="text-blue-500 text-2xl font-bold">
              {props?.reservation?.hotel?.name}
            </p>
            <p>
              {Array.from({
                length: props?.reservation?.hotel?.hotel_star,
              }).map((_, index) => (
                <StarIcon key={index} className="text-yellow-400 text-sm" />
              ))}
            </p>
          </div>

          <div className="text-sm">
            <PlaceIcon /> {hotel?.address}
          </div>
        </div>
      </div>
      <Divider orientation="vertical" variant="fullWidth" flexItem />
      {/* block right */}
      <div className="sm:w-1/3 pl-2 flex flex-col gap-2">
        <p className="text-lg">
          {"Reservation Code: "} <b>{reservation?.reservation_code}</b>
        </p>
        <Divider orientation="horizontal" variant="fullWidth" flexItem />
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <span>{"Check in date: "}</span>
            <p className="font-bold">{reservation?.checkin}</p>
            <p>{hotel?.check_in_time}</p>
          </div>
          <div>
            <span>{"Check out date: "}</span>
            <p className="font-bold">{reservation?.checkout}</p>
            <p>{hotel?.check_out_time}</p>
          </div>
        </div>
        <p>
          <span>{"Status: "}</span>
          <span
            className={`${
              reservation?.status === Constants.RESERVATION_STATUS.CONFIRMED
                ? "text-green-500"
                : "text-red-500"
            } font-bold`}
          >
            {reservation?.status}
          </span>
        </p>{" "}
        <Divider orientation="horizontal" variant="fullWidth" flexItem />
        <div>
          <span>{"Price"}</span>
          <p className="font-bold">{`${reservation?.night_count} night, ${
            Array.isArray(room_types) ? room_types?.length : ""
          } rooms`}</p>
          <p className="text-orange-500 font-bold text-xl">
            {formatNumberToVND(invoice?.invoice_amount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
