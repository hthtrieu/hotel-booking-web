"use client";

import * as React from "react";
import { FormInputProps } from "./FormInputProps.type";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  RadioGroup,
  Radio,
  Autocomplete,
  Slider,
} from "@mui/material";
import { cn, isFunction } from "@/libs/utils";

import Constants from "@/libs/Constants";
import IncrementInput from "./IncrementInput";
// import CustomDateRangePicker from './CustomDateRangePicker';
import DatePicker from "./DatePicker";
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      control,
      type,
      label,
      fieldName,
      placeholder,
      className,
      classNameWrapper,
      classNameInput,
      classNameLabel,
      icon,
      alignIcon,
      onClickIcon,
      // onChange,
      onKeyUp,
      description,
      maxLength,
      options,
      rangeOptions,
      // value,
      autoFocus = false,
      disabled = false,
      readOnly = false,
      onChangeSelect,
      classNameContent,
      labelCheckbox,
      required = false,
      getOptionLabel,
      onChangeEvent,
    },
    ref
  ) => {
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (onChange && isFunction(onChange)) {
    //         onChange(event.target.value);
    //     }
    // };
    const handleClickIcon = (e: React.MouseEvent) => {
      if (onClickIcon && isFunction(onClickIcon)) {
        onClickIcon(e);
      }
    };

    return (
      <FormControl
        size="small"
        className={cn("w-full md:w-fit", classNameWrapper)}
      >
        <Controller
          name={fieldName}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            // formState,
          }) => (
            <div className={cn("w-full flex flex-col", className)}>
              {label ? (
                <FormLabel
                  className={cn("!text-black !font-bold", classNameLabel)}
                  error={error ? true : false}
                >
                  {label}
                  {required ? (
                    <span className="text-red-500 ml-1 text-end">*</span>
                  ) : null}
                </FormLabel>
              ) : null}
              <></>
              {renderInput({
                type,
                placeholder,
                classNameInput,
                icon,
                alignIcon,
                onClickIcon: handleClickIcon,
                onChange: onChange,
                onChangeEvent: onChangeEvent,
                onChangeSelect,
                onKeyUp,
                maxLength,
                ref,
                value,
                options,
                rangeOptions,
                disabled,
                autoFocus,
                classNameContent,
                labelCheckbox,
                readOnly,
                error,
                fieldName,
                getOptionLabel,
                control,
              })}
              {error ? (
                <FormHelperText error={true}>{error?.message}</FormHelperText>
              ) : null}
            </div>
          )}
        />
        {description ? <FormHelperText>{description}</FormHelperText> : null}
      </FormControl>
    );
  }
);

FormInput.displayName = "FormInput";

const renderInput = ({
  value,
  fieldName,
  type,
  placeholder,
  classNameInput,
  icon,
  // alignIcon,
  onClickIcon,
  onChange,
  onChangeEvent,
  onKeyUp,
  maxLength,
  disabled,
  readOnly,
  autoFocus,
  error,
  options,
  rangeOptions,
  onChangeSelect,
  labelCheckbox,
  onCheckboxChange,
  getOptionLabel,
  ref,
}: // control,
any) => {
  switch (type) {
    case Constants.INPUT_TYPE.TEXT:
    case Constants.INPUT_TYPE.EMAIL:
    case Constants.INPUT_TYPE.PASSWORD:
      return (
        <TextField
          size="small"
          value={value}
          type={type}
          placeholder={placeholder}
          className={classNameInput}
          onChange={onChange}
          onKeyUp={onKeyUp}
          inputProps={{ maxLength }}
          inputRef={ref} // Sử dụng inputRef để gán ref
          disabled={disabled}
          autoFocus={autoFocus}
          InputProps={{
            readOnly,
            endAdornment: icon ? (
              <span onClick={onClickIcon} className="cursor-pointer">
                {icon}
              </span>
            ) : null,
          }}
        />
      );

    case Constants.INPUT_TYPE.CHECKBOX:
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
                if (isFunction(onCheckboxChange)) {
                  onCheckboxChange(e.target.checked);
                }
              }}
              disabled={disabled}
            />
          }
          label={labelCheckbox}
        />
      );

    case Constants.INPUT_TYPE.SELECT:
      return (
        <Select
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (isFunction(onChangeSelect)) {
              onChangeSelect(e.target.value);
            }
          }}
          disabled={disabled}
          className={classNameInput}
        >
          {options?.map((x: any) => (
            <MenuItem key={x?.key} value={x?.key}>
              {x?.label}
            </MenuItem>
          ))}
        </Select>
      );

    case Constants.INPUT_TYPE.TEXTAREA:
      return (
        <TextareaAutosize
          value={value}
          placeholder={placeholder}
          className={cn(
            "border-border border-[1px] rounded-md p-2",
            classNameInput
          )}
          onChange={onChange}
          onKeyUp={onKeyUp}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
        />
      );

    case Constants.INPUT_TYPE.RADIO:
      return (
        <RadioGroup
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          row
        >
          {options?.map((x: any, index: number) => (
            <FormControlLabel
              key={index}
              value={x.key}
              control={<Radio disabled={disabled} />}
              label={x.label}
            />
          ))}
        </RadioGroup>
      );
    case Constants.INPUT_TYPE.AUTOCOMPLETE:
      return (
        <div className="w-full">
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: any) => {
              onChange(newValue);
            }}
            options={options}
            getOptionLabel={getOptionLabel}
            // sx={{ width: "100%" }} // Đảm bảo bỏ min-width mặc định
            className=""
            renderInput={(params) => (
              <TextField
                {...params}
                type={type}
                placeholder={placeholder}
                className={cn("w-full md:w-fit", classNameInput)} // class w-full đảm bảo đủ width
                size="small"
              />
            )}
          />
        </div>
      );
    case Constants.INPUT_TYPE.INCREMENT_NUMBER:
      return (
        <IncrementInput
          type={type}
          value={value}
          placeholder={placeholder}
          classNameInput={classNameInput}
          onChange={onChange}
          // onKeyUp={onKeyUp}
          ref={ref}
          disabled={disabled}
          fieldName={fieldName}
        />
      );
    case Constants.INPUT_TYPE.DATE_RANGE_PICKER:
      return (
        <DatePicker
          value={value} // Pass the current value from react-hook-form
          onChange={onChange} // Update the value on change
          fieldName={fieldName}
        />
      );
    case Constants.INPUT_TYPE.RANGE_SLIDER:
      return (
        <Slider
          value={value || [rangeOptions?.min || 0, rangeOptions?.max || 100]} // Giá trị hiện tại của slider
          onChange={(_, newValue) => {
            if (isFunction(onChangeEvent)) {
              onChange(newValue); // Gọi onChange khi giá trị thay đổi
            }
          }}
          valueLabelDisplay="auto" // Hiển thị giá trị khi kéo
          min={rangeOptions?.min || 0} // Giá trị tối thiểu
          max={rangeOptions?.max || 100} // Giá trị tối đa
          step={rangeOptions?.step || 1} // Bước
          disableSwap={rangeOptions?.disableSwap || false} // Ngăn người dùng đảo giá trị min và max
          onChangeCommitted={(_, newValue) => {
            // Hàm này sẽ được gọi khi người dùng thả slider
            if (isFunction(onChangeEvent)) {
              onChangeEvent(newValue); // Gọi onChange khi giá trị thay đổi
            }
          }}
          className={cn("w-full", classNameInput)} // Classname tùy chỉnh
        />
      );
    default:
      return (
        <TextField
          size="small"
          value={value}
          type={type}
          error={error}
          helperText={error ? error.message : null}
          placeholder={placeholder}
          className={classNameInput}
          onChange={onChange}
          onKeyUp={onKeyUp}
          inputProps={{ maxLength }}
          inputRef={ref} // Sử dụng inputRef để gán ref
          disabled={disabled}
          autoFocus={autoFocus}
          InputProps={{
            readOnly,
            startAdornment: icon ? (
              <span onClick={onClickIcon}>{icon}</span>
            ) : null,
          }}
        />
      );
  }
};
