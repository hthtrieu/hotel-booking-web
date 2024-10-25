"use client";

import React, { useState } from "react";
import { FormInput } from "../common/form/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Constants from "@/libs/Constants";
// import { Button } from "@mui/material";
// import { Search } from "@mui/icons-material";
import { formatNumberToVND } from "@/libs/utils";
import { useSearchParams, useRouter } from "next/navigation";
import BlockContainer from "../common/block-container/BlockContainer";

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

  // Utility function to update query params
  const updateQueryParams = (params: Record<string, any>) => {
    const preFilter = Object.fromEntries(searchParams.entries());
    const filter = { ...preFilter, ...params };
    const queryParams = new URLSearchParams(filter).toString();
    router.push(`/hotel?${queryParams}`);
  };

  const handleFilterChange = (key: string, value: any) => {
    switch (key) {
      case "price":
        setPriceOption(value);
        updateQueryParams({ min_price: value[0], max_price: value[1] });
        break;
      case "review":
        updateQueryParams({ review: value });
        break;
      case "hotel_star":
        updateQueryParams({ hotel_star: value });
        break;
      default:
        break;
    }
  };

  const submitForm = (values: any) => {
    updateQueryParams({
      min_price: values.price[0],
      max_price: values.price[1],
      review: values.review,
      hotel_star: values.hotel_star,
    });
  };

  return (
    <BlockContainer>
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
            }}
            classNameWrapper="w-full md:w-full"
            onChangeEvent={(value: any) => handleFilterChange("price", value)}
          />
          <div className="flex justify-between mb-2">
            <span>Min: {formatNumberToVND(priceOption[0])}</span>
            <span>Max: {formatNumberToVND(priceOption[1])}</span>
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
            onChangeSelect={(value) => handleFilterChange("review", value)}
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
            onChangeSelect={(value) => handleFilterChange("hotel_star", value)}
          />
        </div>
        {/* <div className="row-span-1 w-full flex justify-end">
          <Button
            type="submit"
            variant="contained"
            className="w-full flex gap-2 items-end"
          >
            <Search color="warning" />
            Apply filter
          </Button>
        </div> */}
      </form>
    </BlockContainer>
  );
};

export default FilterBox;
