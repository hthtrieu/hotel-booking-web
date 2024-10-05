"use client"

import * as React from 'react';
import { FormInputProps } from './FormInputProps.type';
import { Controller } from 'react-hook-form';
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
} from '@mui/material';
import { cn, isFunction } from '@/libs/utils';

import Constants from '@/libs/Constants';
import IncrementInput from './IncrementInput';
import CustomDateRangePicker from './CustomDateRangePicker';

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            control,
            type,
            label,
            fieldName,
            placeholder,
            className,
            classNameInput,
            classNameLabel,
            icon,
            alignIcon,
            onClickIcon,
            onChange,
            onKeyUp,
            description,
            maxLength,
            options,
            // value,
            autoFocus = false,
            disabled = false,
            readOnly = false,
            onChangeSelect,
            classNameContent,
            labelCheckbox,
            required = false,
            getOptionLabel,
        },
        ref,
    ) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange && isFunction(onChange)) {
                onChange(event.target.value);
            }
        };
        const handleClickIcon = (e: React.MouseEvent) => {
            if (onClickIcon && isFunction(onClickIcon)) {
                onClickIcon(e);
            }
        };

        return (
            <FormControl size="small" className='w-full md:w-fit md:min-w-[200px]'>
                <Controller
                    name={fieldName}
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        // formState,
                    }) => (
                        <div className={cn('w-full', className)}>
                            {label ? (
                                <FormLabel
                                    className={cn('!text-black font-bold', classNameLabel)}
                                    required={required}
                                    error={error ? true : false}
                                >
                                    {label}
                                </FormLabel>
                            ) : null}
                            {renderInput({
                                type,
                                placeholder,
                                classNameInput,
                                icon,
                                alignIcon,
                                onClickIcon: handleClickIcon,
                                onChange: onChange,
                                onChangeEvent: handleChange,
                                onChangeSelect,
                                onKeyUp,
                                maxLength,
                                ref,
                                value,
                                options,
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
                            {error ? <FormHelperText error={true}>{error?.message}</FormHelperText> : <div className=''></div>}

                        </div>
                    )}
                />
                {description ? <FormHelperText>{description}</FormHelperText> : null}
            </FormControl >
        );
    },
);

FormInput.displayName = 'FormInput';

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
    // onChangeEvent,
    onKeyUp,
    maxLength,
    disabled,
    readOnly,
    autoFocus,
    error,
    options,
    onChangeSelect,
    labelCheckbox,
    onCheckboxChange,
    getOptionLabel,
    ref,
    control,
}: any) => {
    switch (type) {
        case Constants.INPUT_TYPE.TEXT:
        case Constants.INPUT_TYPE.EMAIL:
        case Constants.INPUT_TYPE.PASSWORD:
            return (
                <TextField
                    size='small'
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    className={classNameInput}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    inputProps={{ maxLength }}
                    inputRef={ref}  // Sử dụng inputRef để gán ref
                    disabled={disabled}
                    autoFocus={autoFocus}
                    InputProps={{
                        readOnly,
                        startAdornment: icon ? (
                            <span onClick={onClickIcon}>
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
                                onChange(e.target.checked)
                                if (isFunction(onCheckboxChange)) {
                                    onCheckboxChange(e.target.checked)
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
                        onChange(e.target.value)
                        if (isFunction(onChangeSelect)) {
                            onChangeSelect(e.target.value)
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
                    className={cn('border-border border-[1px] rounded-md p-2', classNameInput)}
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
                <div className='w-full'>
                    <Autocomplete
                        value={value}
                        onChange={(event: any, newValue: any) => {
                            onChange(newValue);
                        }}
                        options={options}
                        getOptionLabel={getOptionLabel}
                        sx={{ width: '100%', minWidth: '100%' }} // Đảm bảo bỏ min-width mặc định
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                type={type}
                                placeholder={placeholder}
                                className={cn('w-full min-w-full', classNameInput)} // class w-full đảm bảo đủ width
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
                <CustomDateRangePicker
                    control={control}
                    startFieldName={`${fieldName}.startDate`}
                    endFieldName={`${fieldName}.endDate`}
                    disabled={disabled}
                />
            );
        default:
            return (
                <TextField
                    size='small'
                    value={value}
                    type={type}
                    error={error}
                    helperText={error ? error.message : null}
                    placeholder={placeholder}
                    className={classNameInput}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    inputProps={{ maxLength }}
                    inputRef={ref}  // Sử dụng inputRef để gán ref
                    disabled={disabled}
                    autoFocus={autoFocus}
                    InputProps={{
                        readOnly,
                        startAdornment: icon ? (
                            <span onClick={onClickIcon}>
                                {icon}
                            </span>
                        ) : null,
                    }}
                />

            );
    }
};
