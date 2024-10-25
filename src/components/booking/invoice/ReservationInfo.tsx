"use client";
import React from "react";
import InvoiceActionBlock from "./InvoiceActionBlock";
import BlockContainer from "@/components/common/block-container/BlockContainer";
import { useSelector } from "react-redux";
interface InvoiceData {
  hotel: any;
  reservation: any;
  room_types: any[];
  use: any;
  invoice: any;
}
const ReservationInfo = () => {
  const { invoice } = useSelector(
    (state: {
      Payment: {
        invoice: InvoiceData;
      };
    }) => state.Payment
  );
  return (
    <div className="flex flex-col gap-4">
      <BlockContainer>
        <div className={`text-base mb-3`}>
          <span className="">Reservation Code:</span>{" "}
          <span className="font-bold">
            {invoice?.reservation?.reservation_code}
          </span>
        </div>
      </BlockContainer>
      <BlockContainer>
        <div className="mb-3">
          <InvoiceActionBlock />
        </div>
      </BlockContainer>
    </div>
  );
};

export default ReservationInfo;
