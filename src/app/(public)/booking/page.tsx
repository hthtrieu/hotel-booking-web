import dynamic from "next/dynamic";
const BookingContainer = dynamic(() => import("./BookingContainer"), {
  ssr: false,
});
const page = () => {
  return (
    <div>
      <BookingContainer />
    </div>
  );
};

export default page;
