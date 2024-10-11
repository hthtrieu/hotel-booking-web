"use client";
import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import { formatNumberToVND } from "@/libs/utils";

interface RoomTypeProps {
  roomType: {
    id: string;
    name: string | "";
    price: number;
    images?: any[]; //todo: fix any types
    adult_count: number;
    children_count: number;
    amenities: []; //todo: fix any types
    rooms: any[]; //todo: fix any types
  };
}
const RoomType = (props: RoomTypeProps) => {
  const { roomType } = props;
  
  return (
    <div className={"p-2"}>
      <div className={"font-bold text-base md:text-lg"}>{roomType?.name}</div>
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-2">
          <div>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={roomType?.images?.[0]?.path || ""}
                title="hotel image"
              />
              <CardContent>
                {/* <div className='text-xs text-cyan-400 text-center mb-1'>Xem ảnh và chi tiết</div>
                {Array?.from({ length: 3 })?.map((_, index) => (
                  <div key={index} className='text-xs mb-1'>
                  </div>))
                  } */}
                <button
                  className="flex items-center text-xs"
                  //   onClick={() => handleOpenViewService()}
                >
                  <AddCircleIcon className="mr-1" />{" "}
                  <span className="text-xs text-cyan-400">
                    {" "}
                    Xem thêm tiện ích
                  </span>
                </button>
                {/* <ViewAmenity
                  open={serviceOpen}
                  onClose={handleCloseViewService}
                  amenity={room}
                /> */}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className={`col-span-8 bg-white`}>
          <div className="grid grid-cols-8 gap-0  h-full">
            <div className="col-span-3 p-2 border-gray-200 border-solid border-r-2 h-full">
              <div className="font-bold mb-5">Giá này đã gồm</div>
              {Array.isArray(roomType?.amenities) && roomType?.amenities?.slice(0, 5).map((amenity:any, index:number) => (
                <div key={index} className="text-sm mb-2">
                  <DoneIcon className="text-blue-500 mr-1" />{" "}
                  {amenity?.name}
                </div>
              ))}
            </div>
            <div className="col-span-1 p-2 border-gray-200 border-solid border-r-2 h-full">
              <div className="font-bold mb-5">Sức chứa</div>
              <div className="flex items-end flex-wrap">
                {Array.from({ length: roomType?.adult_count || 0 }).map(
                  (_, index) => (
                    <PersonIcon
                      key={index}
                      className="mr-1 text-2xl text-gray-400"
                    />
                  )
                )}
                {Array.from({ length: roomType?.children_count || 0 }).map(
                  (_, index) => (
                    <PersonIcon
                      key={index}
                      className="mr-1 !text-lg text-gray-400"
                    />
                  )
                )}
              </div>
            </div>
            <div className="col-span-2 p-2 border-gray-200 border-solid border-r-2 h-full">
              <div className="font-bold mb-5">Giá phòng ngày hôm nay</div>
              <div className="text-sm text-red-500 line-through"></div>
              <div className="text-lg font-bold text-orange-500">
                {formatNumberToVND(roomType.price)}
              </div>
            </div>
            <div className="col-span-2 p-2 h-full">
              <div className="font-bold mb-5 flex w-full justify-between">
                Số lượng phòng {roomType?.rooms?.length}
                <span>
                  <select
                    // onChange={(e) => handleSelectQuantity(e.target.value)}
                    className="border-2 border-solid border-gray-500 font-semibold rounded-md hover:border-gray-500 hover:outline-none"
                  >
                    <option value={0}></option>
                    {Array.from({ length: roomType?.rooms?.length || 0 }).map(
                      (_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                </span>
              </div>
              <div>
                <Button
                  variant="contained"
                    color="info"
                  className="text-black font-bold"
                  //   onClick={handleAddRoomToCart}
                  //   disabled={!canClick}
                >
                  Tôi sẽ đặt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
RoomType.defaultProps = {
  room: {
    id: "",
    roomName: "",
    price: 0,
    images: [],
    quantity: 3,
    adult: 2,
    children: 1,
    roomAmenities: [],
  },
};
export default RoomType;
