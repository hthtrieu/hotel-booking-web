"use client";
import { useSelector } from "react-redux";
import ApartmentIcon from "@mui/icons-material/Apartment";

import BlockContainer from "@/components/common/block-container/BlockContainer";

// Define types for state
interface RoomType {
  name: string;
  price: number;
  count: number;
  adult_count: number;
  children_count: number;
  amenities: { name: string }[];
}

interface HotelInfo {
  name: string;
  images: { path: string }[];
  check_in_time: string;
  check_out_time: string;
}

interface CheckInOutDay {
  checkin: string;
  checkout: string;
}

const HotelInfo = () => {
  const { cart, hotelInfo } = useSelector(
    (state: { Cart: { cart: RoomType[]; hotelInfo: HotelInfo } }) => state.Cart
  );
  const { checkInOutDay } = useSelector(
    (state: { UserReservation: { checkInOutDay: CheckInOutDay } }) =>
      state.UserReservation
  );

  return (
    <div>
      {/* Hotel Info */}
      <BlockContainer>
        <div className="w-full h-fit flex flex-col md:flex-row gap-4 ">
          <div className="w-full md:w-1/3">
            {hotelInfo?.images[0]?.path && (
              <img src={hotelInfo.images[0].path} alt="Hotel" />
            )}
          </div>
          <div className="w-full md:w-2/3 border-2 border-yellow-500 rounded-md p-2">
            <div>
              <div className="text-black text-xl font-bold ">
                <ApartmentIcon className="text-blue-900" />
                {hotelInfo?.name}
              </div>
              <div className="flex justify-between mt-2">
                <div className="w-fit flex flex-col ">
                  <div className="text-sm text-gray-500">Check-in Date</div>
                  <div className="font-semibold text-lg my-1">
                    {checkInOutDay?.checkin}
                  </div>
                  <div>{`From ${hotelInfo?.check_in_time}`}</div>
                </div>
                <div className="w-fit flex flex-col ">
                  <div className="text-sm text-gray-500">Check-out Date</div>
                  <div className="font-semibold text-lg my-1">
                    {checkInOutDay?.checkout}
                  </div>
                  <div>{`From ${hotelInfo?.check_out_time}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Room Info */}
        <div className="my-3 flex flex-col gap-2">
          {cart?.map((roomType: RoomType, idx: number) => (
            <div key={idx}>
              <div className="font-bold mb-2">{roomType.name}</div>
              <div className="w-full flex justify-between gap-2 mb-1">
                <span className="w-1/2 md:w-1/6 text-gray-500">
                  Guests/Room
                </span>
                <span className="w-1/2 md:w-5/6">
                  {`${roomType.adult_count} Adults ${
                    roomType.children_count || 0
                  } Children`}
                </span>
              </div>
              <div className="w-full flex justify-between gap-2 mb-1">
                <span className="w-1/2 md:w-1/6 text-gray-500">Amenities</span>
                <div className="flex flex-col w-1/2 md:w-5/6">
                  {roomType.amenities?.map((amenity, idx) => (
                    <div key={idx} className="w-5/6">
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </BlockContainer>
    </div>
  );
};

export default HotelInfo;
