"use client";

import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isFunction } from "@/libs/utils";
import BlockContainer from "@/components/common/block-container/BlockContainer";

interface UserInfoFormProps {
  handleSubmit?: any;
}

const UserInfoForm = (props: UserInfoFormProps) => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Required",
    }),
    phone_number: z.string().min(10, {
      message: "Required",
    }),
    email: z.string().email(),
    note: z
      .number({
        message: "Required",
      })
      .optional(),
  });

  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const submitForm = (values: any) => {
    if (isFunction(props.handleSubmit)) {
      props.handleSubmit(values);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="w-full">
          <div className="text-3xl w-full">
            Hotel Booking
            <div className="text-sm text-gray-500 mt-2">
              Please ensure that all information on this page is accurate before
              proceeding to payment.
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col gap-8">
              <BlockContainer>
                <div className="font-bold text-xl mb-3">
                  Contact Details (for E-tickets/Confirmation Voucher)
                </div>
                <div className={"flex flex-col gap-4"}>
                  <FormInput
                    control={control}
                    fieldName="username"
                    type={Constants.INPUT_TYPE.TEXT}
                    label="Full Name"
                    classNameWrapper="md:w-full"
                    required={true}
                    className="md:w-full flex flex-col"
                  />
                  <div className={`flex flex-row justify-between gap-4`}>
                    <div className="w-1/2">
                      <FormInput
                        control={control}
                        fieldName="phone_number"
                        type={Constants.INPUT_TYPE.TEXT}
                        label="Phone Number"
                        required={true}
                        classNameWrapper="md:w-full"
                      />
                    </div>
                    <div className="w-1/2">
                      <FormInput
                        control={control}
                        fieldName="email"
                        type={Constants.INPUT_TYPE.EMAIL}
                        label="Email"
                        required={true}
                        classNameWrapper="md:w-full"
                      />
                    </div>
                  </div>
                </div>
              </BlockContainer>
              {/* <BlockContainer>
                <div className={``}>
                  <div className="font-bold text-xl mb-3">Tips</div>
                  <div className={""}>
                    <div className="flex flex-row mb-5">
                    </div>
                    <div className="flex flex-row">
                    </div>
                  </div>
                </div>
              </BlockContainer> */}
              <BlockContainer>
                <div className={`my-4`}>
                  <div className={``}>
                    <div className="font-bold text-xl mb-3">
                      Special Requests
                    </div>
                    <div className={""}>
                      <div>
                        Special requests are not guaranteed to be met – however,
                        the accommodation will do its best to fulfill them. You
                        can always send special requests after completing your
                        booking!
                      </div>
                      <div className="font-bold text-base my-6">
                        Please write your request here.
                        <span className="text-sm text-gray-400 font-normal">
                          {"(Optional)"}
                        </span>
                      </div>
                      <FormInput
                        control={control}
                        fieldName="note"
                        label="Notes"
                        classNameWrapper="md:w-full"
                        type={Constants.INPUT_TYPE.TEXT}
                      />
                    </div>
                  </div>
                </div>
              </BlockContainer>
              <div className="flex justify-between items-end justify-items-center">
                <div className="w-7/12">
                  By clicking this button, you acknowledge that you have read
                  and agree to the{" "}
                  <span className="text-blue-500">Terms & Conditions</span> and{" "}
                  <span className="text-blue-500">Privacy Policy</span> of
                  InnSight.
                </div>
                <Button
                  variant="contained"
                  className="w-fit h-fit"
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
