"use client";
import React from "react";
import RoomType from "./RoomType";
import RoomTypeMobile from "./RoomTypeMobile";
interface RoomTypesList {
  roomTypes: any[];
}
const RoomsList = (props: RoomTypesList) => {
  return (
    <div className="bg-gray-100">
      {Array.isArray(props.roomTypes) &&
        props.roomTypes.map((roomType, index: number) => {
          return (
            <div key={index}>
              <RoomType roomType={roomType} />
              <RoomTypeMobile roomType={roomType} />
            </div>
          );
        })}
    </div>
  );
};

export default RoomsList;
