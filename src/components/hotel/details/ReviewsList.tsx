"use client";
import React from "react";
import Slider from "react-slick";

//slick slidercss
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ReviewProps {
  reviews: any[];
}
const ReviewsList = (props: ReviewProps) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <>
      <div className={"font-bold text-lg"}>Reviews</div>
      <div className="w-full max-h-40 mt-2">
        <Slider {...settings}>
          {Array.isArray(props?.reviews) &&
            props?.reviews?.map((review, index) => (
              <div
                className={"h-full px-2 flex flex-col justify-start"}
                key={index}
              >
                <div className={`shadow-md bg-white `}>
                  <div>
                    <span>
                      <span className="text-base text-blue-600 font-semibold">
                        {review?.rating}
                      </span>
                    </span>
                    <span className="text-base text-gray-400">/10</span>
                  </div>
                  <p className="text-sm italic">{review?.comment}</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default ReviewsList;
