import { AmenityType } from "./AmenityType";
import { Image } from "./ImageType";
import { RoomTypeType } from "./RoomTypeType";


// Định nghĩa interface cho khách sạn
export interface HotelType {
    id: string;
    name: string;
    owner_id: string;
    description: string;
    hotel_star: number;
    phone_number: string;
    email?: string;
    check_in_time: string; 
    check_out_time: string;
    province: string; 
    district: string; 
    ward: string;
    street: string; 
    status?: 'ACTIVE' | 'INACTIVE'|string;
    average_rating?: number; // Điểm trung bình
    address?: string; // Địa chỉ đầy đủ
    min_price?: number; // Giá thấp nhất
    images?: Image[]; // Danh sách ảnh
    amenities?: AmenityType[]; // Danh sách tiện nghi
    room_types?: RoomTypeType[]; // Danh sách loại phòng
}
