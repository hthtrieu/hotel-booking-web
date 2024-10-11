"use client";

import { useDispatch, useSelector } from "react-redux";
import AmenitiesList from "@/components/hotel/details/AmenitiesList";
import HotelImages from "@/components/hotel/details/HotelImages";
import ReviewsList from "@/components/hotel/details/ReviewsList";
import RoomsList from "@/components/hotel/room/RoomsList";
import { formatNumberToVND } from "@/libs/utils";
// import React, { useEffect } from "react";
import PlaceIcon from "@mui/icons-material/Place";
// import { Button } from "@mui/material";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import { getHotelByIdAction } from "@/store/hotel/slice";
interface HotelContainerProps {
  id: string;
}

const HotelContainer = (props: HotelContainerProps) => {
  const { hotel } = useSelector((state: any) => state.Hotel);
  const dispatch = useDispatch();

  const getHotelById = (id: string) => {
    dispatch(
      getHotelByIdAction({
        id: id,
        onSuccess: () => {},
        onError: () => {},
      })
    );
  };

  useEffect(() => {
    if (props.id) {
      getHotelById(props.id);
    }
  }, [props]);

  //   open map box
  const handleOpenMap = () => {};
  return (
    <div className={"my-4"}>
      {/* hotel basic info */}
      <div className={"my-4"}>
        <div className={`grid grid-cols-12 `}>
          <div className="col-span-6 sm:col-span-10">
            <div className={"text-lg md:text-3xl text-blue-600 font-bold"}>
              {hotel?.name}
            </div>
            <div>
              {Array.from({ length: hotel?.starts || 0 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className="text-yellow-400 text-sm md:text-base"
                />
              ))}
            </div>
            <p className="text-sm font-semibold">
              <PlaceIcon />
              <span>{hotel?.address}</span>
              <button
                className="text-xs text-cyan-500 ml-2"
                onClick={handleOpenMap}
              >
                Xem bản đồ
              </button>
            </p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="flex flex-col justify-center items-center">
              <div className="font-semibold mb-2">Giá phòng mỗi đêm từ</div>
              <div className="text-2xl text-yellow-500 font-bold mb-2">
                {formatNumberToVND(hotel?.min_price)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hotel images */}
      <HotelImages images={hotel?.images} />

      {/* hotel description */}
      <div className={"my-5"}>
        <div className={"font-bold text-lg"}>Giới thiệu nơi cư trú</div>
        <div className="text-pretty">{hotel?.description}</div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between my-5">
        {/* hotels'amenities */}
        <div className={"w-full sm:w-1/2"}>
          <AmenitiesList amenities={hotel?.amenities} />
        </div>

        {/* hotels'reviews */}
        <div className={"w-full sm:w-1/2"}>
          <ReviewsList reviews={hotel?.reviews} />
        </div>
      </div>
      {/* roomTypes list */}
      <div className="my-5">
        <RoomsList roomTypes={hotel?.room_types} />
      </div>
    </div>
  );
};

export default HotelContainer;
