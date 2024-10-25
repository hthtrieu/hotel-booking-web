"use client";
import React from "react";
import UserInfoForm from "@/components/booking/info-form/UserInfoForm";
import ReservationInfo from "@/components/booking/reservation/ReservationInfo";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "@/store/reservation/slice";
import BlockContainer from "@/components/common/block-container/BlockContainer";

const BookingContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmitUserInfo = (values: any) => {
    dispatch(
      setUserInfoAction({
        userInfo: {
          username: values?.username,
          phone_number: values?.phone_number,
          email: values?.email,
          note: values?.note,
        },
      })
    );
    router.push("/booking/check");
  };
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
      <div className="w-full md:w-2/3">
        <UserInfoForm handleSubmit={handleSubmitUserInfo} />
      </div>
      <div className="w-full md:w-1/3 relative">
        <div className="md:sticky md:top-16">
          <BlockContainer>
            <ReservationInfo />
          </BlockContainer>
        </div>
      </div>
    </div>
  );
};

export default BookingContainer;
