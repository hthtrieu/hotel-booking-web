import HotelContainer from "./HotelContainer";
const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <HotelContainer id={params.id} />
    </>
  );
};

export default page;
