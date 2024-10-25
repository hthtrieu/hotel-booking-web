"use client";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useSelector } from "react-redux";
import { AscDescDate, formatNumberToVND } from "@/libs/utils";
import { ReservationDetailsType } from "@/types/ReservationDetailsType";
import { RoomTypeType } from "@/types/RoomTypeType";

const HotelReservation = () => {
  const { invoice } = useSelector(
    (state: {
      Payment: {
        invoice: ReservationDetailsType;
      };
    }) => state.Payment
  );
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-blue-600 font-bold">
          {invoice?.hotel?.name}
        </h1>
        <h2 className="text-base text-gray-500">
          {invoice?.hotel?.description}
        </h2>
        <div className="flex gap-2">
          <EventAvailableIcon />
          <div className="w-full flex gap-4 justify-between">
            <div className="w-full md:w-1/2 flex flex-col">
              <span className="text-lg font-bold">Check-in date</span>
              <h1 className="font-bold py-1">
                {invoice?.reservation?.checkin}
              </h1>
              <h1>from {invoice?.hotel?.check_in_time}</h1>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <span className="text-lg font-bold">Check-out date</span>
              <h1 className="font-bold py-1">
                {invoice?.reservation?.checkout}
              </h1>
              <h1>from {invoice?.hotel?.check_out_time}</h1>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <EventNoteIcon />
          <div className="w-full">
            <span className="text-lg font-bold">Reservation details</span>
            {invoice?.room_types?.map((roomTypes: RoomTypeType, index: number) => (
              <div className="flex" key={index}>
                <div className="border-2 my-3 ml-4 mr-3"></div>
                <div>
                  <h1 className="font-semibold">
                    ({roomTypes?.total_rooms_order}x) {roomTypes?.name}
                  </h1>
                  <h1>
                    {roomTypes?.adult_count} adult - {roomTypes?.children_count}{" "}
                    children - {roomTypes?.days_count} night
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <VpnKeyIcon />
          <div className="w-full">
            <span className="text-lg font-bold">Check-in instructions</span>
            <h1 className="pl-8 mt-1">
              The key is at the reception desk at the property.
            </h1>
            <h1 className="pl-8 mt-1 italic">24-hour front desk service</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <FmdGoodIcon />
          <div className="w-full">
            <span className="text-lg font-bold">Address</span>
            <h1 className="pl-8 mt-1">{invoice?.hotel?.address}</h1>
          </div>
        </div>
      </div>

      <div className="mt-5 font-bold text-base">
        <h1 className="text-xl text-sky-800  mb-4">Cancellation Policy</h1>
        <div>
          <span>Free cancellation until </span>
          <span className="text-green-600">
            {`${AscDescDate(
              invoice?.reservation?.checkin || "",
              2,
              false
            )} 23:59 `}
          </span>
          <span>{formatNumberToVND(0)} </span>
        </div>
        <div>
          <span>From </span>
          <span className="text-red-500">
            {`${AscDescDate(
              invoice?.reservation?.checkin || "",
              1,
              false
            )} 23:59 `}
          </span>
          <span>
            cancellation fee of
            <span className="text-red-500">
              {` ${formatNumberToVND(invoice?.reservation?.total_price)} `}
            </span>
            - You will be charged for the cancellation
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelReservation;
