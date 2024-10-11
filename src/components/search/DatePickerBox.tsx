import Constants from "@/libs/Constants";
import React from "react";
import { FormInput } from "../common/form/FormInput";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useWatch } from "react-hook-form";
import { useRef } from "react";
import useOnClickOutside from "@/hooks/use-click-outside";
// import { format } from "date-fns";

interface DateBoxInterface {
    control: any;
}
// const newDate = new Date();
const DatePickerBox = (props: DateBoxInterface) => {
    const { control } = props;
    const boxRef = useRef(null);
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    // Use watch to track values from the form
    const date = useWatch({
        control,
        name: "date",
        // defaultValue: {

        // }
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;
    useOnClickOutside(boxRef, () => {
        setAnchor(null);
    });
    return (
        <div className="w-full md:w-fit"            >
            <div
                aria-describedby={id}
                onClick={handleClick}

                className="border-[1px] rounded-md p-2"
            >
                {`${date?.startDate} - ${date?.endDate} `}
            </div>

            <BasePopup
                ref={boxRef}
                id={id}
                open={open}
                anchor={anchor}
                // disablePortal
                className="z-[51] rounded-lg font-sans font-medium text-sm mt-2 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white  text-slate-900"
            >
                <div className="flex flex-col">
                    <FormInput
                        type={Constants.INPUT_TYPE.DATE_RANGE_PICKER}
                        fieldName="date"
                        control={control}
                        label="Check in - Check out"
                        classNameWrapper="!w-full md:w-fit"
                    />
                </div>
            </BasePopup>
        </div>
    );
}

export default DatePickerBox;
