import React from "react";
import dynamic from "next/dynamic";
const PaymentInvoiceContainer = dynamic(
  () => import("./PaymentInvoiceContainer"),
  {
    ssr: false,
  }
);
const page = () => {
  return (
    <div>
      <PaymentInvoiceContainer />
    </div>
  );
};

export default page;
