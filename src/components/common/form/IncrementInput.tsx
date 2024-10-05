import React from 'react';
import { IconButton, TextField } from '@mui/material';
import { Remove, Add } from '@mui/icons-material';
import { cn } from '@/libs/utils';

interface IncrementInputProps {
    type: string;
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    classNameInput?: string;
    disabled?: boolean;
    readOnly?: boolean;
    ref?: any;
    fieldName: string;
}

const IncrementInput = ({
    type,
    value,
    onChange,
    placeholder,
    classNameInput,
    disabled,
    readOnly,
    ref,
    fieldName,
}: IncrementInputProps) => {
    return (
        <div className='flex gap-2 border-[1px] border-current rounded-md px-1'>
            <IconButton
                type='button'
                size={'small'}
                onClick={() => {
                    if (typeof value === 'string' || value == undefined) {
                        value = parseInt(value) || 0
                    }
                    if (value <= 0) {
                        onChange(0)
                    }
                    else {
                        onChange(value - 1)
                    }
                }}
                disabled={disabled || readOnly}
            >
                <Remove />
            </IconButton>
            <TextField
                name={fieldName}
                type={type}
                size='small'
                value={value}
                placeholder={placeholder}
                className={cn('!w-28 !text-center ', classNameInput)}
                inputRef={ref}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
                inputProps={{ readOnly: true, autoFocus: false }}
            />
            <IconButton
                type='button'
                size={'small'}
                onClick={() => {
                    if (typeof value === 'string') {
                        value = parseInt(value) || 0
                    }
                    onChange(value + 1)
                }}
                disabled={disabled || readOnly}
            >
                <Add />
            </IconButton>
        </div>
    );
};

export default IncrementInput;
