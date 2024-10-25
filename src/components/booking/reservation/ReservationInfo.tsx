"use client";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckIcon from "@mui/icons-material/Check";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useSelector } from "react-redux";
const ReservationInfo = () => {
  const { cart, hotelInfo } = useSelector((state: any) => state.Cart);
  const { checkInOutDay } = useSelector((state: any) => state.UserReservation);
  return (
    <div className="w-full">
      <div className="font-bold text-2xl ">
        <span>
          <ApartmentIcon className="text-blue-800 " />
        </span>
        {hotelInfo?.name || "Hotel"}
      </div>
      <div className="text-sm my-2">
        <span>
          <FmdGoodIcon className="text-blue-700 mb-1" />
        </span>
        <span>{hotelInfo?.address || "Dia chi"}</span>
      </div>
      {/* checkin-checkout */}
      <div className="bg-blue-100 w-full p-5  text-base">
        <div className="flex  justify-between">
          <div className="text-gray-500 ">Check in date</div>
          <div className="font-bold">
            <div>{checkInOutDay?.checkin}</div>
            <div>{`from ${hotelInfo?.check_in_time}`}</div>
          </div>
        </div>
        <div className="flex  justify-between">
          <div className="text-gray-500 ">Check out date</div>
          <div className="font-bold">
            <div>{checkInOutDay?.checkout}</div>
            <div>{`from ${hotelInfo?.check_out_time}`}</div>
          </div>
        </div>
      </div>
      {/* roomtypes */}
      <div className="p-5">
        {cart?.map((room: any, idx: number) => (
          <div key={idx}>
            <div className="font-bold text-xl">
              <span>({`${room?.count}x`}) </span>
              {room?.name}
            </div>
            <div>
              <div className="flex justify-between text-base my-4">
                <div className="text-gray-500">People/Room</div>
                <div>{`${room?.adult_count} Adult ${
                  room?.children_count || 0
                } Children`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* hotel amenities */}
      <div className="p-5">
        <div className="flex justify-between">
          <div className="w-4/12 ">
            <img src={hotelInfo?.images[0]?.path} />
          </div>
          <div className="w-7/12">
            {Array.isArray(hotelInfo?.amenities) &&
              hotelInfo?.amenities?.map((amenity: any, index: number) => {
                return (
                  <div className="font-bold" key={index}>
                    <span>
                      <CheckIcon className="text-green-500" />
                    </span>
                    {amenity?.name}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;
