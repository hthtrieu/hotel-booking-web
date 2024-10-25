"use client";
import React from "react";
import { useSelector } from "react-redux";
import { formatNumberToVND } from "@/libs/utils";
import { useEffect, useState } from "react";
import Constants from "@/libs/Constants";

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

const ReservationPrice = () => {
  const { cart } = useSelector(
    (state: { Cart: { cart: RoomType[]; hotelInfo: HotelInfo } }) => state.Cart
  );
  const [vat, setVat] = useState<number | null>(null);

  useEffect(() => {
    if (cart?.length) {
      const total = cart.reduce(
        (acc: number, room: RoomType) => acc + room.price * (room.count || 0),
        0
      );
      const totalWithTax = total + (total * Constants.TAX) / 100;
      setVat(parseFloat(totalWithTax.toFixed(3)));
    }
  }, [cart]);

  return (
    <div className="my-3">
      <div className="font-bold text-xl mb-3">Price Details</div>
      <div>
        <div className="flex justify-between">
          <div className="font-bold text-xl">Total Amount</div>
          <div className="font-bold text-xl text-red-800">
            {vat ? formatNumberToVND(vat) : ""}
          </div>
        </div>
        <div className="text-blue-800 font-semibold text-justify">
          Taxes and fees are amounts that InnSight passes on to the hotel. For
          any questions about taxes and invoices, please refer to the Terms and
          Conditions of InnSight for clarification.
        </div>
        <div className="border border-solid border-gray-200 my-5"></div>
        <div className="text-base">
          {cart?.map((roomType: RoomType, idx: number) => (
            <div
              key={idx}
              className="flex justify-between justify-items-center pb-2"
            >
              <div>
                <span>{`(${roomType.count}x) `}</span>
                {roomType.name}
              </div>
              <div>{formatNumberToVND(roomType.count * roomType.price)}</div>
            </div>
          ))}
          <div className="flex justify-between justify-items-center">
            <div>Taxes and Fees</div>
            <div>{`${Constants.TAX}%`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPrice;
