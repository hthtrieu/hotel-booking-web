import React from "react";
import dynamic from "next/dynamic";
const CancelInfoContainer = dynamic(() => import("./CancelInfoContainer"), {
  ssr: false,
});
const page = () => {
  return (
    <div>
      <CancelInfoContainer />
    </div>
  );
};

export default page;
