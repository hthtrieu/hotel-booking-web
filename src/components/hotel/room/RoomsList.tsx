"use client";
import React from "react";
import RoomType from "./RoomType";

interface RoomTypesList {
  roomTypes: any[];
}
const RoomsList = (props: RoomTypesList) => {
  return (
    <div className="bg-gray-100">
      {Array.isArray(props.roomTypes) &&
        props.roomTypes.map((roomType, index: number) => {
          return <RoomType key={index} roomType={roomType} />;
        })}
    </div>
  );
};

export default RoomsList;
