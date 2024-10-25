"use client";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import { getItem } from "@/libs/LocalStorage";

const InvoiceActionBlock = () => {
  const isLogin = getItem("isLogin") || false;

  return (
    <div className={`text-base`}>
      <div className="font-bold text-xl">Is all the information correct?</div>
      <div className={`mb-4 mt-2`}></div>
      <h2 className="text-sm">
        You can always view or change your reservation online - no need to
        register.
      </h2>
      <Link href={`/booking/invoice/cancel`}>
        <div className="my-4 flex justify-items-center">
          <HighlightOffIcon className="text-2xl mr-2" />
          <span className="font-bold text-sky-700">Cancel Reservation</span>
        </div>
      </Link>
      <Link href={isLogin ? "/mysettings/history" : "/sign-in"}>
        <div className="my-4 flex justify-items-center">
          <RemoveRedEyeIcon className="text-2xl mr-2" />
          <span className="font-bold text-sky-700">View Reservations</span>
        </div>
      </Link>
      <Link href={"/"}>
        <div className="my-4 flex justify-items-center">
          <CalendarMonthIcon className="text-2xl mr-2" />
          <span className="font-bold text-sky-700">Book Another Room</span>
        </div>
      </Link>
    </div>
  );
};

export default InvoiceActionBlock;
