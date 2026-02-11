"use client";

import { useState, ChangeEvent } from "react";
import InputBase from "./input-base";
import { applyMask } from "@/lib/apply-mask.function";

interface InputTextProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  mask?: string | string[];
  srOnly?: boolean;
}

export default function InputText({
  label,
  errorMessage,
  mask,
  srOnly = false,
  onChange,
  ...props
}: InputTextProps) {
  const [value, setValue] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const nextValue = mask
      ? applyMask(inputValue, mask)
      : inputValue;

    setValue(nextValue);

    onChange?.({
      ...e,
      target: {
        ...e.target,
        value: nextValue,
      },
      currentTarget: {
        ...e.currentTarget,
        value: nextValue,
      },
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <label className={srOnly ? "sr-only" : "text-legend text-base-3"}>
        {label}
      </label>

      <InputBase
        {...props}
        value={value}
        onChange={handleChange}
      />
      <p className="size-4 text-red-500 text-sm">{errorMessage}</p>
    </div>
  );
}
