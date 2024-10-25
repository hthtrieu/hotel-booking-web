
// Định nghĩa interface cho khách sạn
export interface ReservationType {
    id: string;
    site_fees: number;
    tax_paid: number;
    total_price: number;
    status?: string;
    reservation_code: string|'';
    checkin?: string;
    checkout?: string; 
    night_count?:number;
}