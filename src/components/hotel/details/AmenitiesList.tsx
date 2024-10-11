"use client";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface AmenitiesProps {
  amenities: any[];
}
const AmenitiesList = (props: AmenitiesProps) => {
  return (
    <>
      <div className={"font-bold text-lg"}>Tiện ích</div>
      <div className="flex flex-wrap w-full mt-2">
        {Array.from({ length: props?.amenities?.length || 0 })?.map(
          (_, index) => (
            <div key={index} className="w-1/2">
              <ChevronRightIcon className="pb-1 text-base text-blue-600" />
              {props?.amenities[index]?.name}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AmenitiesList;
