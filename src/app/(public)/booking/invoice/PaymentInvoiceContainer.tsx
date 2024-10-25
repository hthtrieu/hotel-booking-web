"use client";

import Constants from "@/libs/Constants";
import { getItem } from "@/libs/LocalStorage";
import { saveInvoiceAction } from "@/store/payment/slice";
import { useSearchParams } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
//eslint-disable-next-line
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import DataNotFound from "@/components/data-not-found/DataNotFound";
import DoneIcon from "@mui/icons-material/Done";
import HotelReservation from "@/components/booking/invoice/HotelReservation";
import ReservationInfo from "@/components/booking/invoice/ReservationInfo";

type Reservation = {
  reservation_id: string;
  [key: string]: any;
};

interface InvoiceData {
  hotel: any;
  reservation: any;
  room_types: any[];
  user: any;
  invoice: any;
}

const PaymentInvoice = () => {
  const { invoice } = useSelector(
    (state: {
      Payment: {
        invoice: InvoiceData;
      };
    }) => state.Payment
  );

  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // const getInvoiceByReservation = (reservation_id: string) => {
  //   dispatch(
  //     getInvoiceAction({
  //       reservation_id: reservation_id,
  //       onSuccess: () => {},
  //       onError: () => {},
  //     })
  //   );
  // };

  useEffect(() => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    if (Object.keys(paramsObj).length > 0) {
      const reservation = getItem<Reservation>("reservation");
      if (paramsObj?.vnp_TransactionStatus === "00") {
        setIsPaymentSuccess(true);
        const saveReservation = {
          reservation_id: reservation?.reservation_id || "",
          order_id: paramsObj?.vnp_TxnRef,
          transaction_date: paramsObj?.vnp_PayDate,
          payment_method: Constants.PAYMENT_METHOD.CREDIT_CARD,
          reservation_code: "",
        };
        dispatch(
          saveInvoiceAction({
            data: saveReservation,
            // onSuccess: (reservationId: string) => {
            //   getInvoiceByReservation(reservationId);
            // },
          })
        );
      }
    }
  }, [searchParams]);

  return (
    <div className="w-full">
      {isPaymentSuccess ? (
        <div className="w-full flex flex-col md:flex-row">
          {/* left block */}
          <div className="w-full md:w-2/3">
            <div className="w-full mb-6">
              <div className="text-sm text-green-600">Confirmed</div>
              <div className="text-xl font-bold mb-2">
                Your booking in {invoice?.hotel?.province} has been confirmed
              </div>
              <div>
                <DoneIcon className="text-green-600 font-bold mb-1" />
                <span>
                  Please check your inbox! The invoice has just been sent.
                </span>
              </div>
              <div>
                <DoneIcon className="text-green-600 font-bold mb-1" />
                <span>
                  You have successfully paid for the booking. Enjoy your
                  holiday!
                </span>
              </div>
            </div>
            <HotelReservation />
          </div>
          {/* right block */}
          <div className="w-full md:w-1/3 relative ">
            <div className="sticky top-16">
              <ReservationInfo />
            </div>
          </div>
        </div>
      ) : (
        <>Please try again!</>
      )}
    </div>
  );
};

export default PaymentInvoice;
