
export interface InvoiceType{
    id: string;
    invoice_amount: number;
    refund_amount?: number;
    order_id?: string|'';
    time_canceled: string|'';
    time_created: string|'';
    time_paid: string;
    created_by?: string|'';
}
