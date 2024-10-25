"use-client";

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
    onHandleSelectRoomQuantity?: any;
  };
}

const useSelectRoomQuantity = (props: RoomTypeProps) => {
  //eslint-disable-next-line
  const { roomType } = props;
  //eslint-disable-next-line
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const addRoomTypeToCart = () => {};
}

export default useSelectRoomQuantity;
