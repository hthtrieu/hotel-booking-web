"use client";
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VietNamProvince } from "@/libs/VietNamProvinceData";
import OptionsBox from "./OptionsBox";
import DatePickerBox from "./DatePickerBox";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { showToast } from "@/libs/showToast";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const newDate = new Date();

const HotelSearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [preFilter, setPreFilter] = useState<
    { [k: string]: string } | undefined
  >(undefined);

  const formSchema = z.object({
    province: z.any({
      message: "Required",
    }), // province object (code, name, label, ...)
    adult: z
      .number({
        message: "Required",
      })
      .min(1, {
        message: "Minimum is 1",
      }),
    children: z
      .number({
        message: "Required",
      })
      .min(0, {
        message: "Minimum is 0",
      }),
    rooms: z
      .number({
        message: "Required",
      })
      .min(1, {
        message: "Minimum is 1",
      }),
    date: z.object({
      startDate: z.any(),
      endDate: z.any(),
    }),
  });

  const { handleSubmit, control, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      province: "",
      adult: 2,
      children: 0,
      rooms: 1,
      date: {
        startDate: format(newDate, "yyyy-MM-dd"),
        endDate: format(newDate, "yyyy-MM-dd"),
      },
    },
  });

  // Lấy và set giá trị preFilter từ URL search params
  useEffect(() => {
    if (searchParams.size > 0) {
      const _preFilter = Object.fromEntries(searchParams.entries());
      setPreFilter(_preFilter);
    }
  }, [searchParams]);

  // Reset form values khi preFilter thay đổi
  useEffect(() => {
    if (preFilter) {
      reset({
        province: preFilter?.province
          ? VietNamProvince.find((item) => item.name === preFilter?.province)
          : "",
        adult: preFilter?.adult ? parseInt(preFilter.adult) : 2,
        children: preFilter?.children ? parseInt(preFilter.children) : 0,
        rooms: preFilter?.rooms ? parseInt(preFilter.rooms) : 1,
        date: {
          startDate: preFilter?.checkin
            ? preFilter?.checkin
            : format(newDate, "yyyy-MM-dd"),
          endDate: preFilter?.checkout
            ? preFilter?.checkout
            : format(newDate, "yyyy-MM-dd"),
        },
      });
    }
  }, [preFilter, reset]);

  const submitForm = (values: any) => {
    const provinceName =
      typeof values?.province === "object"
        ? values?.province?.name
        : values?.province;

    if (!provinceName) {
      showToast("warning", "Please choose the city");
      return;
    }

    const filter = {
      ...preFilter,
      province: provinceName,
      checkin: values?.date?.startDate,
      checkout: values?.date?.endDate,
      adult: values?.adult,
      children: values?.children,
      rooms: values?.rooms,
    };

    const queryParams = new URLSearchParams(filter).toString();
    router.push(`/hotel?${queryParams}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col md:flex-row border-yellow-500 w-full p-4 border-2 gap-4 items-end rounded-md justify-center">
          <FormInput
            type={Constants.INPUT_TYPE.AUTOCOMPLETE}
            control={control}
            fieldName="province"
            placeholder="Choose city"
            options={VietNamProvince}
            getOptionLabel={(option) => option?.name || ""}
            className="w-fit"
          />
          <DatePickerBox control={control} />
          <OptionsBox control={control} />
          <Button
            className="w-full md:w-fit"
            type="submit"
            variant="contained"
            size="large"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HotelSearchForm;
