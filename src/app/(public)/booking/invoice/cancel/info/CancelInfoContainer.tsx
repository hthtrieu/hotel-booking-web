"use client";
import { Grid, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatNumberToVND } from "@/libs/utils";

interface InvoiceData {
  hotel: any;
  reservation: any;
  room_types: any[];
  user: any;
  invoice: any;
}

const CancelInfoContainer: React.FC = () => {
  const { invoice } = useSelector(
    (state: {
      Payment: {
        invoice: InvoiceData;
      };
    }) => state.Payment
  );
  const charged =
    invoice?.invoice?.invoice_amount - invoice?.invoice?.refund_amount;

  return (
    <div className={""}>
      <Box mt={4}>
        <Box display="flex" alignItems="center" className="text-2xl">
          <Typography variant="h5">{"Your Booking"}</Typography>
          {charged ? (
            <Typography
              variant="h5"
              color="error"
              className="ml-1 font-semibold"
            >
              {" has been canceled with a FEE"}
            </Typography>
          ) : (
            <Typography
              variant="h5"
              color="success.main"
              className="ml-1 font-semibold"
            >
              {"  has been canceled for FREE"}
            </Typography>
          )}
        </Box>

        <Box className="mb-3 ml-10 text-lg mt-4 mr-10">
          <Box display="flex" gap={2} alignItems="center" className="mb-4">
            <CheckCircleIcon color="success" />
            <Typography>
              We have sent a cancellation notification email to
            </Typography>
            <Typography variant="h6" component="span" className="font-bold">
              {invoice?.user?.email}
            </Typography>
          </Box>
          <Box display="flex" gap={2} alignItems="center" className="mb-4">
            <CheckCircleIcon color="success" />
            <Typography variant="h6" component="span" className="font-bold">
              Your booking has been successfully canceled -
            </Typography>
            <Typography>You don’t need to do anything else!</Typography>
          </Box>
          <Box display="flex" gap={2} className="mb-14">
            <CheckCircleIcon color="success" />
            <Typography>
              You may have been charged for all or part of the booking by
              <span className="font-bold"> {invoice?.hotel?.name} </span> - this
              is completely normal. Refunds typically take 10 - 15 business
              days.
            </Typography>
          </Box>
        </Box>

        <Box className="border bg-green-100">
          <Grid container className="m-4 text-xl">
            <Grid item xs={6} className="ml-20">
              <Typography className="text-lg mb-4">
                Cancellation fee:
              </Typography>
              <Typography className="text-lg">Refund amount:</Typography>
            </Grid>
            <Grid item xs={6} className="text-right mr-40">
              {charged ? (
                <>
                  <Typography className="text-lg mb-4 font-bold" color="error">
                    {formatNumberToVND(invoice?.invoice?.refund_amount)}
                  </Typography>
                  <Typography
                    className="text-lg font-bold"
                    color="success.main"
                  >
                    {formatNumberToVND(invoice?.invoice?.refund_amount)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    className="text-lg mb-4 font-bold"
                    color="success.main"
                  >
                    Free of charge
                  </Typography>
                  <Typography
                    className="text-lg font-bold"
                    color="success.main"
                  >
                    {formatNumberToVND(invoice?.invoice?.amount_amount)}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" gap={2} mt={5}>
          <Link href="/user/reservations">
            <Button variant="contained" color="primary" className="py-2 px-6">
              View Booking
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outlined" color="primary" className="py-2 px-6">
              Find Other Accommodations
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default CancelInfoContainer;
