"use client";
//eslint-disable-next-line
//eslint-disable-next-line
import CancelReservationDetails from "@/components/booking/cancel/CancelReservationDetails";
import BlockContainer from "@/components/common/block-container/BlockContainer";
import CancelReservationInfo from "@/components/booking/cancel/CancelReservationInfo";
import { useSelector } from "react-redux";
import DataNotFound from "@/components/data-not-found/DataNotFound";
// interface ReservationContainerProps {
//   id: string;
// }
interface InvoiceData {
  hotel: any;
  reservation: any;
  room_types: any[];
  use: any;
  invoice: any;
}

const CancelConfirmContainer = () => {
  const { invoice } = useSelector(
    (state: {
      Payment: {
        invoice: InvoiceData;
      };
    }) => state.Payment
  );

  return (
    <div>
      {invoice?.invoice ? (
        <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
          <div className="w-full md:w-2/3">
            <CancelReservationDetails />
          </div>
          <div className="w-full md:w-1/3 relative">
            <div className="md:sticky md:top-16">
              <BlockContainer>
                <CancelReservationInfo />
              </BlockContainer>
            </div>
          </div>
        </div>
      ) : (
        <>
          <DataNotFound message="Invoice not found" />
        </>
      )}
    </div>
  );
};

export default CancelConfirmContainer;
