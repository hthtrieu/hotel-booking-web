"use client";
//eslint-disable-next-line
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { formatNumberToVND } from "@/libs/utils";

interface InvoiceData {
  hotel: any;
  reservation: any;
  room_types: any[];
  user: any;
  invoice: any;
}

const CancelReservationInfo = () => {
  const { invoice } = useSelector(
    (state: {
      Payment: {
        invoice: InvoiceData;
      };
    }) => state.Payment
  );

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

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col flex-nowrap">
          <img
            src={
              Array.isArray(invoice?.hotel?.images)
                ? invoice?.hotel?.images[0]?.path
                : ""
            }
            alt="bookingReserved.imagePath"
            // className={}
          />
          <p className="font-bold text-2xl text-blue-500">
            {invoice?.hotel?.name}
          </p>
          <div>
            <Typography variant="body2" mt={1}>
              {invoice?.reservation?.checkin} - {invoice?.reservation?.checkout}
            </Typography>
            <span>{invoice?.room_types?.length} rooms</span>
          </div>
        </div>
        <Grid container className="py-4 text-xl border-t">
          <Grid item xs={6}>
            <Typography variant="body1" mb={1}>
              Your Booking
            </Typography>
            <Typography variant="body1" mb={1}>
              Cancellation Fee
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Amount you will pay
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="body1" mb={1}>
              {formatNumberToVND(invoice?.reservation?.total_price)}
            </Typography>
            <Typography variant="body1" mb={1}>
              {cancelCharge ? "10%" : "0%"} *{" "}
              {formatNumberToVND(invoice?.reservation?.total_price)}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatNumberToVND(cancelCharge)}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Box className="border p-3">
        <Typography variant="h6" fontWeight="bold">
          Cancellation Policy
        </Typography>
        <Typography variant="body2" mt={2}>
          You can cancel for free up to 2 days before check-in. You will have to
          pay 10% of the room rate if you cancel within 1 day before check-in.
          If you are a no-show, the no-show fee will be equal to the
          cancellation fee.
        </Typography>
      </Box>
    </div>
  );
};

export default CancelReservationInfo;
