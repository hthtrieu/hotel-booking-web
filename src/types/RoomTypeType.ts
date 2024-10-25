import { AmenityType } from "./AmenityType";
import { BedType } from "./BedType";
import { Image } from "./ImageType";

// Định nghĩa interface cho loại phòng
export interface RoomTypeType {
    id: string;
    name: string;
    price: number;
    bathroom_count: number;
    room_area: number; // Diện tích phòng (m2)
    adult_count: number; // Số lượng người lớn
    children_count: number; // Số lượng trẻ em
    room_count: number; // Số lượng phòng
    description: string;
    hotel_id?: string|""; // ID của khách sạn
    images: Image[]|[];
    amenities: AmenityType[] |[];
    bed_types: BedType[]|[]; // Thêm định nghĩa cho BedType nếu cần
    days_count?:number;
    total_rooms_order?:number;
}
