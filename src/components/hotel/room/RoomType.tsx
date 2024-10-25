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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { useDispatch } from "react-redux";
import { addRoomTypeToCartAction } from "@/store/cart/slice";
import { showToast } from "@/libs/showToast";

interface RoomTypeProps {
  roomType: {
    id: string;
    name: string | "";
    price: number;
    images?: any[]; //todo: fix any types
    adult_count: number;
    children_count: number;
    room_count?: number;
    amenities: []; //todo: fix any types
    rooms: any[]; //todo: fix any types
    bed_types: any[];
    onHandleSelectRoomQuantity?: any;
  };
}

const RoomType = (props: RoomTypeProps) => {
  const { roomType } = props;
  const dispatch = useDispatch();
  const formSchema = z.object({
    count: z.number().optional(),
  });
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      count: 0,
    },
  });

  const addRoomTypeToCart = (values: any) => {
    if (values?.count) {
      dispatch(
        addRoomTypeToCartAction({
          roomType: {
            ...props.roomType,
            count: values?.count,
          },
          onSuccess: () => {
            showToast("success", "Added to cart successfully");
          },
          onError: () => {},
        })
      );
    } else {
      showToast("warning", "Please select the number of rooms");
    }
  };

  return (
    <div className={"p-2 hidden sm:block"}>
      <div className={"font-bold text-base md:text-lg"}>{roomType?.name}</div>
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-2">
          <div>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image={roomType?.images?.[0]?.path || ""}
                title="Room Type Image"
              />
              <CardContent>
                <button className="flex items-center text-xs">
                  <AddCircleIcon className="mr-1" />{" "}
                  <span className="text-xs text-cyan-400">
                    {" "}
                    View more amenities
                  </span>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className={`col-span-8 bg-white`}>
          <div className="grid grid-cols-8 gap-0  h-full">
            <div className="col-span-3 p-2 border-gray-200 border-solid border-r-2 h-full">
              <div className="font-bold mb-5">This price includes</div>
              <div className="w-full flex flex-col md:flex-row justify-between gap-2">
                <div className="w-1/2">
                  {Array.isArray(roomType?.amenities) &&
                    roomType?.amenities
                      ?.slice(0, 5)
                      .map((amenity: any, index: number) => (
                        <div key={index} className="text-sm mb-2">
                          <DoneIcon className="text-blue-500 mr-1" />{" "}
                          {amenity?.name}
                        </div>
                      ))}
                </div>
                <div className="w-1/2">
                  {Array.isArray(roomType?.bed_types) &&
                    roomType?.bed_types
                      ?.slice(0, 5)
                      .map((amenity: any, index: number) => (
                        <div key={index} className="text-sm mb-2">
                          <DoneIcon className="text-blue-500 mr-1" />{" "}
                          {amenity?.name}
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div className="col-span-1 p-2 border-gray-200 border-solid border-r-2 h-full">
              <div className="font-bold mb-5">Capacity</div>
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
              <div className="font-bold mb-5">Today&apos; room price</div>
              <div className="text-sm text-red-500 line-through"></div>
              <div className="text-lg font-bold text-orange-500 text-ellipsis">
                {formatNumberToVND(roomType.price)}
              </div>
            </div>
            <div className="col-span-2 p-2 h-full">
              <form onSubmit={handleSubmit(addRoomTypeToCart)}>
                <div className="font-bold mb-5 flex w-full justify-between">
                  Number of rooms {roomType?.rooms?.length}
                  <span>
                    <FormInput
                      control={control}
                      fieldName="count"
                      type={Constants.INPUT_TYPE.SELECT}
                      options={Array.from({ length: roomType?.room_count || 0 }).map((_, index) => {
                        return {
                          key: index + 1,
                          label: index + 1,
                        };
                      })}
                    />
                  </span>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="info"
                    className="text-black font-bold"
                    type="submit"
                  >
                    I will book
                  </Button>
                </div>
              </form>
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
