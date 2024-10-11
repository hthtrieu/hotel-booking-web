"use client";
import React from "react";

import {
  Button,
  //    Card, CardMedia
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import CheckIcon from "@mui/icons-material/Check";
import { formatNumberToVND, isFunction } from "@/libs/utils";
// import Image from 'next/image';
interface AmenitiesProps {
  id: string;
  name: string;
}
interface ImagesProps {
  id: string;
  path: string;
}
interface HotelProps {
  id: string;
  name: string;
  address: string | "";
  description: string;
  price: number;
  hotel_starts: number;
  images?: ImagesProps[];
  province: string;
  district: string;
  ward: string;
  street: string;
  average_rating: number;
  min_price: number | null;
  amenities: AmenitiesProps[];
  handleClick: any;
}
const HotelCard = ({ props }: { props: HotelProps }) => {
  return (
    <div className="border-[1px] rounded-md border-gray-600 p-4 mb-4 h-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-3">
          {props.images && props.images?.length > 0 && (
            <>
              <img
                className="rounded-2xl  md:h-60 md:w-52 object-cover"
                src={props.images[0].path}
                alt={props.name}
              />
            </>
          )}
        </div>
        <div className="col-span-1 md:col-span-9 h-full">
          <div className={"text-xl md:text-2xl text-blue-600 font-bold"}>
            {props.name}
          </div>
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-col w-fit md:w-8/12">
              <div className="text-sm">
                <PlaceIcon /> {props?.address}
              </div>
              {props?.amenities
                ?.slice(0, 5)
                .map((item: AmenitiesProps, index) => (
                  <div key={index}>
                    <CheckIcon /> {item.name}
                  </div>
                ))}
              <div className="flex justify-start mt-2">
                <span className="block mr-2 text-orange-500 font-bold">
                  {props?.average_rating}/10{" "}
                </span>
                {/* <span style={{ color: 'black' }}>{props?.} lượt đánh giá</span>  */}
              </div>
            </div>
            <div className="flex flex-col items-start md:flex-col-reverse md:items-end w-fit md:w-4/12">
              <Button
                variant={"contained"}
                color="warning"
                onClick={() => {
                  if (isFunction(props.handleClick)) {
                    props.handleClick(props.id);
                  }
                }}
              >
                Chọn phòng
              </Button>

              <div className="flex flex-col items-end mb-5">
                <span className={"text-orange-500 font-bold text-3xl"}>
                  {formatNumberToVND(props.min_price)}
                </span>

                <span>Phòng/đêm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
