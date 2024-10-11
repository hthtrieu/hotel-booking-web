"use client";
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatToLocalDate } from "@/libs/utils";
import { addDays } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { incrementAction } from "@/store/example/slice";
// import CustomDateRangePicker from "@/components/common/form/CustomDateRangePicker";
export const Libraries = () => {
  const { count, isLoading } = useSelector((state: any) => state.Example);
  const dispatch = useDispatch();
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Required",
    }),
    password: z.string().min(6, {
      message: "Required",
    }),
    age: z.number({
      message: "Required",
    }),
    agree: z.boolean().optional(),
    description: z.string().optional(),
    gender: z.string({
      message: "Required",
    }),
    date: z.any(),
    items: z.number().min(1, {
      message: "Minimum is 1",
    }),
    rangeValue: z.any(),
  });
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "username",
      password: "password",
      // age: 1,
      agree: false,
      items: 1,
      date: {
        startDate: formatToLocalDate(new Date()),
        endDate: formatToLocalDate(addDays(new Date(), 7)),
      },
    },
  });
  const submitForm = (values: any) => {
    console.log("submit values", values);
  };

  const increNumber = () => {
    dispatch(
      incrementAction({
        num: count + 1,
      })
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex gap-4 flex-wrap">
          <FormInput
            control={control}
            fieldName="username"
            type={Constants.INPUT_TYPE.TEXT}
            label="User name"
            placeholder="Enter user name"
            required={true}
          />
          <FormInput
            control={control}
            fieldName="password"
            type={Constants.INPUT_TYPE.PASSWORD}
            label="Password"
            placeholder="Enter you password"
          />
          <FormInput
            control={control}
            fieldName="age"
            type={Constants.INPUT_TYPE.SELECT}
            label="Age"
            options={[
              { key: 1, label: 1 },
              { key: 2, label: 2 },
            ]}
          />
          <FormInput
            control={control}
            fieldName="agree"
            type={Constants.INPUT_TYPE.CHECKBOX}
            labelCheckbox="Agree with term"
          />
          <FormInput
            control={control}
            fieldName="description"
            type={Constants.INPUT_TYPE.TEXTAREA}
            label="Description"
            placeholder="Description yourself"
          />
          <FormInput
            control={control}
            fieldName="gender"
            type={Constants.INPUT_TYPE.RADIO}
            label="Gender"
            options={[
              { key: 1, label: "Female" },
              { key: 0, label: "Male" },
            ]}
          />
          <FormInput
            control={control}
            fieldName="date"
            type={Constants.INPUT_TYPE.DATE_RANGE_PICKER}
          />
          <FormInput
            type={Constants.INPUT_TYPE.INCREMENT_NUMBER}
            control={control}
            fieldName="items"
          />
          <FormInput
            control={control}
            type={Constants.INPUT_TYPE.RANGE_SLIDER}
            fieldName="rangeValue"
            label="Select Range"
            rangeOptions={{ min: 0, max: 100, step: 5, disableSwap: true }} // Cấu hình min, max, step, disableSwap
          />
          {/* <CustomDateRangePicker /> */}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
        {/* <div>Values: {`${}`}</div> */}
      </form>

      <div className="my-8">
        Redux Example:
        <div>{isLoading ? <>Loading</> : <></>}</div>
        <p>{count}</p>
        <Button type="button" onClick={increNumber}>
          Click
        </Button>
      </div>
    </>
  );
};
