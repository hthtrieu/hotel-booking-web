import React from "react";
// import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";

interface CustomDateRangePickerProps {
    control: any;
    startFieldName: string;
    endFieldName: string;
    labelStart?: string;
    labelEnd?: string;
    disabled?: boolean;
}

const CustomDateRangePicker = ({
    control,
    startFieldName,
    endFieldName,
    labelStart = "Start Date",
    labelEnd = "End Date",
    disabled = false,
}: CustomDateRangePickerProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex gap-4">
                {/* Start Date */}
                <Controller
                    name={startFieldName}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <DatePicker
                            format="YYYY-MM-DD"
                            label={labelStart}
                            value={value ? dayjs(value) : null}
                            onChange={(newValue: Dayjs | null) => {
                                onChange(newValue ? newValue?.format('YYYY-MM-DD') : null);
                            }}
                            slotProps={{
                                textField: {
                                    error: !!error,
                                    helperText: error ? error.message : null,
                                    disabled,
                                    size: "small"
                                },
                            }}
                        />
                    )}
                />

                {/* End Date */}
                <Controller
                    name={endFieldName}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <DatePicker
                            format="YYYY-MM-DD"
                            label={labelEnd}
                            value={value ? dayjs(value) : null}
                            onChange={(newValue: Dayjs | null) => {
                                onChange(newValue ? newValue?.format('YYYY-MM-DD') : null);
                            }}
                            slotProps={{
                                textField: {
                                    error: !!error,
                                    helperText: error ? error.message : null,
                                    disabled,
                                    size: "small"
                                },
                            }}
                        />
                    )}
                />
            </div>
        </LocalizationProvider>
    );
};

export default CustomDateRangePicker;
