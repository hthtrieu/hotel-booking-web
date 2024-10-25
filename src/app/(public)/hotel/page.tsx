import React from "react";
import { Suspense } from "react";
import HotelResultContainer from "../hotel/HotelsResultContainer";
import Loading from "@/components/common/loading/Loading";

// // This component passed as a fallback to the Suspense boundary
// // will be rendered in place of the search bar in the initial HTML.
// // When the value is available during React hydration the fallback
// // will be replaced with the `<HotelSearchForm>` component.

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HotelResultContainer />
    </Suspense>

  );
};

export default page;
