"use client";
//eslint-disable-next-line
import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatNumberToVND } from "@/libs/utils";
import { useDispatch } from "react-redux";
import { refundInvoiceAction } from "@/store/payment/slice";
import { useRouter } from "next/navigation";

interface InvoiceData {
  hotel: any;
  reservation: any;
  room_types: any[];
  user: any;
  invoice: any;
}

const CancelReservationDetails = () => {
  const { invoice } = useSelector(
    (state: {
      Payment: {
        invoice: InvoiceData;
      };
    }) => state.Payment
  );

  const dispatch = useDispatch();
  const router = useRouter();

  let cancelCharge = 0;
  const today = new Date();
  const bookingStartDate = new Date(invoice?.reservation?.checkin);

  if (
    Math.floor(
      (bookingStartDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
    ) >= 1
  ) {
    cancelCharge = 0;
  } else {
    cancelCharge = invoice?.reservation?.total_price * 0.1;
  }

  const confirmRefund = () => {
    dispatch(
      refundInvoiceAction({
        data: {
          transaction_type: cancelCharge ? "03" : "02",
          order_id: invoice?.invoice?.order_id,
          transaction_date: invoice?.invoice?.time_paid,
          user: invoice?.user?.name,
          price: cancelCharge,
        },
        onSuccess: () => {
          router.push("/booking/invoice/cancel/info");
        },
      })
    );
  };

  return (
    <Grid item xs={12} md={8}>
      <div className="text-2xl text-blue-500 font-bold">
        Cancel Confirmation
      </div>
      <Typography variant="body1">
        You are about to cancel your entire booking. Please review the
        information below before canceling.
      </Typography>
      <Box mt={2} display="flex">
        {/* <IcBed /> */}
        <Box ml={2}>
          {invoice?.room_types?.map((roomType: any, idx: number) => {
            return (
              <Box mb={2} key={idx}>
                <Typography variant="subtitle1" fontWeight="bold">
                  ({roomType?.total_rooms}x) {roomType?.name}
                </Typography>
                <Typography variant="body2">
                  {roomType?.adult_count} adults - {roomType?.children_count}{" "}
                  children - {roomType?.day_count} nights
                </Typography>
              </Box>
            );
          })}

          <Typography
            variant="subtitle1"
            className={cancelCharge ? "text-red-600" : "text-green-600"}
            fontWeight="bold"
          >
            {cancelCharge ? "Cancellation Fee" : "Free Cancellation"}
          </Typography>
        </Box>
      </Box>

      <Box className="border-t border-b pt-5">
        <div className="text-2xl text-blue-500 font-bold">Price Details</div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">Your Booking</Typography>
            <Typography variant="body1">Cancellation Fee</Typography>
            <Typography variant="body1" fontWeight="bold">
              Amount you will pay
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="body1">
              {formatNumberToVND(invoice?.reservation?.total_price)}
            </Typography>

            <Typography variant="body1">
              {cancelCharge ? "10%" : "0%"} *{" "}
              {invoice?.reservation?.total_price}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatNumberToVND(cancelCharge)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Typography
        variant="body1"
        mt={3}
        className={cancelCharge ? "text-red-600" : "text-green-600"}
      >
        {cancelCharge
          ? `Refund amount is ${formatNumberToVND(
              invoice?.reservation?.total_price - cancelCharge
            )}`
          : `The amount of ${formatNumberToVND(
              invoice?.reservation?.total_price - cancelCharge
            )} will be refunded to your account.`}
      </Typography>

      <div className="flex gap-4 my-4 justify-end">
        <Button variant="contained" color="error" onClick={confirmRefund}>
          Confirm Cancellation
        </Button>
        <Link href="/booking/invoice">
          <Button variant="contained">I want to keep this booking</Button>
        </Link>
      </div>
    </Grid>
  );
};

export default CancelReservationDetails;
