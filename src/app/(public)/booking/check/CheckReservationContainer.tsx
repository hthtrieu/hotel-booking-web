"use client";
import HotelInfo from "@/components/booking/hotel-info/HotelInfo";
import UserInfoBox from "@/components/booking/info-form/UserInfoBox";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Constants from "@/libs/Constants";
import { getPaymentLinkAction } from "@/store/payment/slice";
import BlockContainer from "@/components/common/block-container/BlockContainer";
import ReservationPrice from "@/components/booking/hotel-info/ReservationPrice";

const CheckReservationContainer = () => {
  const { cart, hotelInfo } = useSelector((state: any) => state.Cart);
  const { checkInOutDay, userInfo } = useSelector(
    (state: any) => state.UserReservation
  );
  const dispatch = useDispatch();

  const getPaymentLink = () => {
    const total = cart.reduce(
      (acc: number, room: any) => acc + room.price * (room.count || 0),
      0
    );
    const totalWithTax = total + (total * Constants.TAX) / 100;
    const reservation = {
      hotel_id: hotelInfo?.id,
      name: userInfo?.username,
      email: userInfo?.email,
      phoneNumber: userInfo?.phone_number,
      checkInDay: checkInOutDay?.checkin,
      checkOutDay: checkInOutDay?.checkout,
      roomTypeReservedList: cart?.map((roomType: any) => ({
        id: roomType?.id,
        count: roomType?.count,
        price: roomType?.price,
      })),
      totalPrice: total,
      tax: (total * Constants.TAX) / 100,
      vat: parseFloat(totalWithTax.toFixed(3)),
    };

    dispatch(
      getPaymentLinkAction({
        reservation: reservation,
        onSuccess: (vnp_url: string) => {
          window.location.href = vnp_url;
        },
      })
    );
  };

  return (
    <div className="w-full">
      <div className="text-3xl w-full font-bold ">
        Please check your reservation
        <div className="text-sm text-gray-500 mt-2 font-semibold ">
          Please review your booking details before proceeding to the payment
          step.
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
        <div className="w-full md:w-2/3">
          <HotelInfo />
          <BlockContainer>
            <ReservationPrice />
            <div className="flex flex-col md:flex-row md:justify-between justify-items-center items-end gap-2 ">
              <div className="w-full md:w-7/12 text-justify">
                By clicking this button, you acknowledge that you have read and
                agree to the{" "}
                <span className="text-blue-500">Terms & Conditions</span> and{" "}
                <span className="text-blue-500">Privacy Policy</span> of
                InnSight.
              </div>
              <Button
                //   onClick={handleSubmitReservation}
                variant="contained"
                className="w-fit h-fit"
                color="warning"
                onClick={getPaymentLink}
              >
                Continue to Payment
              </Button>
            </div>
          </BlockContainer>
        </div>
        <div className="w-full md:w-1/3 relative">
          <div className="md:sticky md:top-16">
            {/* <ContactBlock /> */}
            <UserInfoBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckReservationContainer;
