"use client";

import { useDispatch, useSelector } from "react-redux";
import Banner from "@/components/banner/Banner";
import { Pagination, Stack } from "@mui/material";
import HotelSearchForm from "@/components/search/HotelSearchForm";
import FilterBox from "@/components/search/FilterBox";
import HotelsList from "@/components/hotel/search/HotelsList";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchHotelAction } from "@/store/hotel-search/slice";
const HotelResultContainer = () => {
  //eslint-disable-next-line
  const { hotelsList, pagination } = useSelector(
    (state: any) => state.HotelSearch
  );
  const [pageIndex, setPageIndex] = useState(1);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const getHotelsList = (filter: any) => {
    dispatch(
      searchHotelAction({
        province: filter.province,
        checkin: filter.checkin,
        checkout: filter.checkout,
        adult: filter.adult ? parseInt(filter.adult) : 0,
        children: filter.children ? parseInt(filter.children) : 0,
        rooms: filter.rooms ? parseInt(filter.rooms) : 0,
        min_price: filter.min_price ? parseInt(filter.min_price) : null,
        max_price: filter.max_price ? parseInt(filter.max_price) : null,
        review: filter.review ? parseInt(filter.review) : 0,
        hotel_star: filter.hotel_star ? parseInt(filter.hotel_star) : 0,
        page_index: filter?.page_index ? parseInt(filter.page_index) : 1,
        onSuccess: () => {},
        onError: () => {},
      })
    );
  };

  const onChangePage = (event: any, value: number) => {
    const filter = Object.fromEntries(searchParams.entries());
    filter.page_index = value.toString();
    setPageIndex(value);
    getHotelsList(filter);
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      const filter = Object.fromEntries(searchParams.entries());
      getHotelsList(filter);
    }
  }, [searchParams]);
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Banner />
        <div className="md:absolute md:top-[90%] md:z-10 bg-white w-full md:w-[80%] md:left-1/2 md:translate-x-[-50%] rounded-lg">
          <HotelSearchForm />
        </div>
      </div>
      {/*  */}
      <div className="my-4 md:my-28">
        <div className="grid md:grid-cols-12 my-4 gap-2">
          <div className="md:col-span-3 relative">
            <div className="sticky top-16">
              <FilterBox />
            </div>
          </div>

          <div className="md:col-span-9">
            <HotelsList data={hotelsList} />
          </div>
        </div>
        <div className="w-full flex justify-end my-4">
          <Stack spacing={2}>
            <Pagination
              count={pagination?.last_page || 0}
              defaultPage={1}
              page={pageIndex}
              variant="text"
              shape="rounded"
              color="standard"
              onChange={onChangePage}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default HotelResultContainer;
