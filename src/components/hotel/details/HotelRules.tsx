"use client";

interface HotelRulesProps {
  hotelRules: {
    check_in_time: string;
    check_out_time: string;
    rules?: string[];
  };
}

const HotelRules = (props: HotelRulesProps) => {
  const { check_in_time, check_out_time, rules } = props.hotelRules;
  return (
    <div className={`w-full`}>
      <div className={"font-bold text-lg"}>Rules</div>
      <div className="flex flex-nowrap w-full m-4 ">
        <div className="w-1/6 whitespace-wrap font-bold text-base ">{`Check in`}</div>
        <div className="w-5/6 font-bold">{`from ${check_in_time}`}</div>
      </div>
      <div className="flex flex-nowrap w-full m-4 ">
        <div className="w-1/6 whitespace-wrap font-bold text-base ">{`Check out`}</div>
        <div className="w-5/6 font-bold">{`from ${check_out_time}`}</div>
      </div>
      {/* <div className="flex flex-nowrap w-full m-4 ">
        <div className="w-1/6 whitespace-wrap font-bold text-base ">{`Các quy tắc khác`}</div>
      </div> */}
      {rules?.map((rule: string, index: number) => (
        <div key={index} className="flex flex-nowrap w-full m-4 ">
          <div className="w-1/6 whitespace-wrap font-bold text-base "></div>
          <div className="w-5/6 font-bold">{rule}</div>
        </div>
      ))}
    </div>
  );
};

export default HotelRules;
