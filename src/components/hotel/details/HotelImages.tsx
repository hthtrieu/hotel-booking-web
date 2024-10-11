"use client";
import React from "react";

interface ImageProps {
  path: string;
}
interface HotelImagesList {
  images: ImageProps[];
}
const HotelImages = (props: HotelImagesList) => {
  const { images } = props;
  return (
    <div className="grid grid-cols-10 gap-2">
      <div className="col-span-6">
        {images?.[0] && (
          <img
            className="w-full h-full object-cover"
            src={images[0]?.path}
            alt=""
          />
        )}
      </div>
      <div className="col-span-2">
        <div className="grid grid-rows-3 gap-2">
          <div className="row-span-1">
            {images?.[1] && (
              <img
                className="w-full h-full object-cover"
                src={images[1]?.path}
                alt=""
              />
            )}
          </div>
          <div className="row-span-1">
            {images?.[2] && (
              <img
                className="w-full h-full object-cover"
                src={images[2]?.path}
                alt=""
              />
            )}
          </div>
          <div className="row-span-1">
            {images?.[3] && (
              <img
                className="w-full h-full object-cover"
                src={images[3]?.path}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid grid-rows-3 gap-2">
          <div className="row-span-1">
            {images?.[4] && (
              <img
                className="w-full h-full object-cover"
                src={images[4]?.path}
                alt=""
              />
            )}
          </div>
          <div className="row-span-1">
            {images?.[5] && (
              <img
                className="w-full h-full object-cover"
                src={images[5]?.path}
                alt=""
              />
            )}
          </div>
          <div className="row-span-1">
            {images?.[6] && (
              <img
                className="w-full h-full object-cover"
                src={images[6]?.path}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelImages;
