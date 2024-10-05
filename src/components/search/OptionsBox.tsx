import Constants from "@/libs/Constants";
import React from "react";
import { FormInput } from "../common/form/FormInput";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useWatch } from "react-hook-form";
import { useRef } from "react";
import useOnClickOutside from "@/hooks/use-click-outside";
interface OptionBoxInterface {
    control: any;
}
const OptionsBox = (props: OptionBoxInterface) => {
    const { control } = props;
    const boxRef = useRef(null);
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    // Use watch to track values from the form
    const adult = useWatch({
        control,
        name: "adult",
        defaultValue: 1, // You can set default values
    });
    const children = useWatch({
        control,
        name: "children",
        defaultValue: 0,
    });
    const room = useWatch({
        control,
        name: "room",
        defaultValue: 1,
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
        <div ref={boxRef}>
            <div>
                <div
                    aria-describedby={id}
                    onClick={handleClick}
                    className="border-[1px] rounded-md p-2"
                >
                    {`Adults: ${adult} - Children: ${children} - Rooms: ${room}`}
                </div>

                <BasePopup
                    id={id}
                    open={open}
                    anchor={anchor}
                    disablePortal
                    className="z-50 rounded-lg font-sans font-medium text-sm mt-2 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white  text-slate-900"
                >
                    <div className="flex flex-col">
                        <FormInput
                            type={Constants.INPUT_TYPE.INCREMENT_NUMBER}
                            fieldName="adult"
                            control={control}
                            label="Adult"
                        />
                        <FormInput
                            type={Constants.INPUT_TYPE.INCREMENT_NUMBER}
                            fieldName="children"
                            control={control}
                            label="Children"
                        />
                        <FormInput
                            type={Constants.INPUT_TYPE.INCREMENT_NUMBER}
                            fieldName="room"
                            control={control}
                            label="Room"
                        />
                    </div>
                </BasePopup>
            </div>
        </div>
    );
}

export default OptionsBox;
