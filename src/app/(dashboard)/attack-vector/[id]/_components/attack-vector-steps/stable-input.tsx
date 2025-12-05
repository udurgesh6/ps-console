import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Input } from "@/components/ui/input";

interface StableInputProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface StableInputRef {
  focus: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

export const StableInput = forwardRef<StableInputRef, StableInputProps>(
  ({ placeholder, className, disabled, defaultValue = '', onChange, onFocus, onBlur }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef(defaultValue);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      getValue: () => {
        return valueRef.current;
      },
      setValue: (value: string) => {
        valueRef.current = value;
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      }
    }));

    useEffect(() => {
      if (inputRef.current && inputRef.current.value !== defaultValue) {
        inputRef.current.value = defaultValue;
        valueRef.current = defaultValue;
      }
    }, [defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      valueRef.current = newValue;
      onChange?.(newValue);
    };

    console.log('StableInput render - this should only happen once');

    return (
      <Input
        ref={inputRef}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);

StableInput.displayName = 'StableInput';
