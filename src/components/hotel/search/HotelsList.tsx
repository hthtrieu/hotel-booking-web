"use client";
import React from "react";

import HotelCard from "./HotelCard";
import { useRouter } from "next/navigation";

interface HotelsListProps {
  data: any[];
}
const HotelsList = (props: HotelsListProps) => {
  //eslint-disable-next-line
  const { data } = props;
  const router = useRouter();

  const handleClickItem = (id: string) => {
    router.push(`/hotel/${id}`);
  };

  return (
    <div className="grid grid-rows-1 gap-4">
      {Array.isArray(data) &&
        data.map((hotel: any, index: number) => {
          return (
            <div key={index} className="row-span-1">
              <HotelCard
                props={{
                  ...hotel,
                  handleClick: handleClickItem,
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default HotelsList;
