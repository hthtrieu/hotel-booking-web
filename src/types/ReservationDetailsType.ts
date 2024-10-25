import { HotelType } from "./HotelType";
import { InvoiceType } from "./InvoiceType";
import { ReservationType } from "./ReservationType";
import { RoomTypeType } from "./RoomTypeType";
import { UserType } from "./UserType";

export interface ReservationDetailsType{
    user: UserType;
    reservation: ReservationType;
    invoice: InvoiceType;
    room_types: RoomTypeType[];
    hotel: HotelType;
}