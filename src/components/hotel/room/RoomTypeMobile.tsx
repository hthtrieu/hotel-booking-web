"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import { CardActions } from '@mui/material';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { formatNumberToVND } from "@/libs/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { showToast } from "@/libs/showToast";
import { addRoomTypeToCartAction } from "@/store/cart/slice";
import { useDispatch } from "react-redux";

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
    bed_types: any[];
    onHandleSelectRoomQuantity?: any;
    room_count?: number;

  };
}
//eslint-disable-next-line
const RoomTypeMobile = (props: RoomTypeProps) => {
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
            showToast("success", "Da them vao gio hang");
          },
          onError: () => {},
        })
      );
    } else {
      showToast("warning", "Hay chon so luong phong");
    }
  };
  return (
    <div className="block sm:hidden p-2">
      {/* <div className="font-semibold text-base">{roomType.name}</div> */}
      <Card sx={{}}>
        <CardMedia
          sx={{ height: 200 }}
          image={roomType?.images?.[0]?.path || ""}
          title={roomType.name}
        />
        <CardContent>
          <div className="flex justify-between">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontWeight: 700 }}
            >
              {roomType.name}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {Array.isArray(roomType?.amenities) &&
                roomType?.amenities
                  ?.slice(0, 5)
                  .map((amenity: any, index: number) => (
                    <div key={index} className="">
                      <DoneIcon className="text-blue-500 mr-1" />{" "}
                      {amenity?.name}
                    </div>
                  ))}
            </Typography>
            <div className="flex flex-col justify-between">
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: 700, color: "orange" }}
                >
                  {formatNumberToVND(roomType.price)}
                </Typography>
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

              <form onSubmit={handleSubmit(addRoomTypeToCart)}>
                <div className="flex flex-col gap-2">
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
                  <Button
                    variant="contained"
                    color="info"
                    className="text-black font-bold"
                    type="submit"
                  >
                    Tôi sẽ đặt
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomTypeMobile;
