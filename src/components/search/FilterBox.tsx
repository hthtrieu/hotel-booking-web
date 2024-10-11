"use client";

import React, { useState } from "react";
import { FormInput } from "../common/form/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Constants from "@/libs/Constants";
import { Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { formatNumberToVND } from "@/libs/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const FilterBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceOption, setPriceOption] = useState([100000, 5000000]);
  const formSchema = z.object({
    price: z.any(),
    review: z.number(),
    hotel_star: z.number(),
  });
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: [100000, 5000000],
      review: 1,
      hotel_star: 1,
    },
  });
  const onPriceRangeChange = (value: any) => {
    setPriceOption(value);
  };
  const submitForm = (values: any) => {
    const preFilter = Object.fromEntries(searchParams.entries());
    const filter = {
      ...preFilter,
      min_price: values?.price[0],
      max_price: values?.price[1],
      review: values?.review,
      hotel_star: values?.hotel_star,
    };
    const queryParams = new URLSearchParams(filter).toString();
    router.push(`/hotel?${queryParams}`);
  };
  return (
    <div className="border-[1px] border-zinc-500 rounded-md p-2">
      <form
        className="grid grid-rows-1 gap-4"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="row-span-1 w-full">
          <FormInput
            control={control}
            type={Constants.INPUT_TYPE.RANGE_SLIDER}
            fieldName="price"
            label="Price"
            rangeOptions={{
              min: 100000,
              max: 5000000,
              step: 100000,
              disableSwap: true,
            }} // Cấu hình min, max, step, disableSwap
            classNameWrapper="w-full md:w-full"
            onChangeEvent={onPriceRangeChange}
          />
          <div className="flex justify-between mb-2">
            <span>
              Min: {priceOption ? formatNumberToVND(priceOption[0]) : null}
            </span>
            <span>
              Max: {priceOption ? formatNumberToVND(priceOption[1]) : null}
            </span>
          </div>
        </div>
        <div className="row-span-1 w-full">
          <FormInput
            type={Constants.INPUT_TYPE.SELECT}
            control={control}
            fieldName="review"
            label="Hotel review score"
            classNameWrapper="md:w-full"
            options={Constants.HOTEL_REVIEW_SCORE}
            className="flex flex-col"
          />
        </div>
        <div className="row-span-1 w-full">
          <FormInput
            type={Constants.INPUT_TYPE.SELECT}
            control={control}
            fieldName="hotel_star"
            label="Hotel star"
            options={Constants.HOTEL_STAR}
            classNameWrapper="md:w-full"
            className="flex flex-col w-full"
          />
        </div>
        <div className="row-span-1 w-full flex justify-end">
          {/* <IconButton type='submit' color='info' className='!bg-blue-700 w-full'>
                    </IconButton> */}
          <Button
            type="submit"
            variant="contained"
            className="w-full flex gap-2 items-end"
          >
            <Search color="warning" />
            Apply filter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterBox;
