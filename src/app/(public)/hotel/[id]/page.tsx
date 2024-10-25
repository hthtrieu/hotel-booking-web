import Loading from "@/components/common/loading/Loading";
import HotelContainer from "./HotelContainer";
import { Suspense } from "react";
const page = ({ params }: { params: { id: string } }) => {
  return (
       <Suspense fallback={<Loading />}>
         <HotelContainer id={params.id} />
    </Suspense>
  );
};

export default page;
