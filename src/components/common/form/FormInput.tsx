"use client"

import * as React from 'react';
import { FormInputProps } from './FormInputProps.type';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import RadioGroup from '@mui/material/RadioGroup';
// import Radio from '@mui/material/Radio';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import TextareaAutosize from '@mui/material/TextareaAutosize';

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
    Radio
} from '@mui/material';
import { cn, isFunction } from '@/libs/utils';
import Constants from '@/libs/Constants';

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
            <FormControl className={className} size="small">
                {label ? (
                    <FormLabel className={classNameLabel}>
                        {label}
                        {required ? <span className="text-red-600">*</span> : null}
                    </FormLabel>
                ) : null}
                <Controller
                    name={fieldName}
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        // formState,
                    }) => (
                        <>
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
                            })}
                        </>
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
    ref,
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
                    helperText={error ? error.message : null}
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
                    className={cn('border-black', classNameInput)}
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
                        console.log(typeof e.target.value)
                        onChange(e.target.value);
                        // if (isFunction(onChangeSelect)) {
                        //     onChangeSelect(e.target.value);
                        // }
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

        default:
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
    }
};
