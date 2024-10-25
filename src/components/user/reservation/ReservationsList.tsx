"use client";
import Reservation from "./Reservation";

interface ReservationsListProps {
  data:[]|any;
}
const ReservationsList = (props: ReservationsListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {
        Array.isArray(props.data) && props?.data?.map((reservation:any, idx:number) =>(
        
          <Reservation key={idx} reservation={reservation}/>

        ))
      }
      {/* <Reservation />
      <Reservation /> */}
    </div>
  );
};

export default ReservationsList;
