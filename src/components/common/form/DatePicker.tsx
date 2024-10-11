import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
//react-date-range css
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { formatToLocalDate } from "@/libs/utils";
interface DatePickerProps {
  value: any;
  onChange: (value: any) => void;
  fieldName: string;
  className?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const { value, onChange } = props;

  const [state, setState] = useState([
    {
      // startDate: formatToLocalDate(value?.startDate) || formatToLocalDate(new Date()),
      // endDate: formatToLocalDate(value?.endDate) || formatToLocalDate(addDays(new Date(), 7)),
      startDate: value?.startDate || new Date(),
      endDate: value?.endDate || addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  useEffect(() => {
    if (!value || !value?.startDate || !value?.endDate) {
      onChange({
        startDate: formatToLocalDate(new Date()),
        endDate: formatToLocalDate(addDays(new Date(), 1)),
      });
    }
  }, [value]);
  const handleSelect = (ranges: any) => {
    const selection = ranges.selection;
    setState([selection]);
    onChange({
      startDate: formatToLocalDate(selection.startDate),
      endDate: formatToLocalDate(selection.endDate),
    });
  };

  return (
    <div className="w-full md:w-fit">
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
};

export default DatePicker;
