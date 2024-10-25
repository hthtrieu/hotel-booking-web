"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { formatToLocalDate } from "@/libs/utils";
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "@/store/user/slice";

const Container = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: any) => state.User);
  const getUserProfile = () => {
    dispatch(getProfileAction({}));
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  const formSchema = z.object({
    name: z.string().min(6),
    email: z.string().email(),
    phone_number: z.string().min(8).max(12),
    address: z.string().optional(),
    gender: z.number().min(0).min(1),
    date: z.any(),
  });
  const { handleSubmit, control, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  // Cập nhật form values khi `profile` thay đổi
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        email: profile.email,
        phone_number: profile.phone_number,
        address: profile.address,
        gender: profile.gender,
      });
    }
  }, [profile, reset]);
  const submitForm = (values: any) => {
    console.log("submit values", values);
  };
  return (
    <div>
      <p className="text-2xl font-semibold">Edit Profile</p>
      <p className="text-sm">Update your profile</p>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="bg-slate-200 my-4 rounded-md p-4 w-full md:w-full flex flex-col gap-6">
          <div className="">
            <div className="flex justify-between items-start">
              <span className="font-bold">Name</span>
              <FormInput
                control={control}
                type={Constants.INPUT_TYPE.TEXT}
                fieldName="name"
                classNameWrapper="md:w-2/3 bg-white"
              />
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-start">
              <span className="font-bold">Email</span>
              <FormInput
                control={control}
                type={Constants.INPUT_TYPE.EMAIL}
                fieldName="email"
                classNameWrapper="md:w-2/3 bg-white"
              />
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-start">
              <span className="font-bold">Phone</span>
              <FormInput
                control={control}
                type={Constants.INPUT_TYPE.TEXT}
                fieldName="phone_number"
                classNameWrapper="md:w-2/3 bg-white"
              />
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-start">
              <span className="font-bold">Address</span>
              <FormInput
                control={control}
                type={Constants.INPUT_TYPE.TEXT}
                fieldName="address"
                classNameWrapper="md:w-2/3 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="contained">
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Container;
