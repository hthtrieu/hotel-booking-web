import React from "react";
import dynamic from "next/dynamic";
const CheckReservationContainer = dynamic(
  () => import("./CheckReservationContainer"),
  {
    ssr: false,
  }
);
const page = () => {
  return (
    <div>
      <CheckReservationContainer />
    </div>
  );
};

export default page;
