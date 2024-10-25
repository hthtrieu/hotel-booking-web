import React from "react";
import dynamic from "next/dynamic";
const CancelConfirmContainer = dynamic(
  () => import("./CancelConfirmContainer"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div>
      <CancelConfirmContainer />
    </div>
  );
};

export default page;
