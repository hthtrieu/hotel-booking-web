"use client";
import { useSelector } from "react-redux";
import BlockContainer from "@/components/common/block-container/BlockContainer";
// import { useEffect, useState } from "react";
const UserInfoBox = () => {
  const { userInfo } = useSelector((state: any) => state.UserReservation);
  return (
    <BlockContainer>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-end">
          <span className="text-base">Name:</span>
          <span className="font-semibold text-lg">{userInfo?.username}</span>
        </div>
        <div className="flex gap-2 items-end">
          <span className="text-base">Email:</span>
          <span className="font-semibold text-lg">{userInfo?.email}</span>
        </div>
        <div className="flex gap-2 items-end">
          <span className="text-base">Phone number:</span>
          <span className="font-semibold text-lg">
            {userInfo?.phone_number}
          </span>
        </div>
        <div className="flex gap-2 items-end">
          <span className="text-base">Note:</span>
          <span className="font-semibold text-lg">{userInfo?.note}</span>
        </div>
      </div>
    </BlockContainer>
  );
};

export default UserInfoBox;
