"use client";

import { ChangeEvent } from "react";
import { applyMask } from "@/lib/apply-mask.function";
import { cn } from "@/lib/utils";
import { InputBase } from "./input-base";

interface InputTextProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  mask?: string | string[];
  srOnly?: boolean;
}

export function InputText({
  label,
  errorMessage,
  mask,
  srOnly = false,
  onChange,
  value,
  ...props
}: InputTextProps) {

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    const nextValue = mask
      ? applyMask(inputValue, mask)
      : inputValue;

    e.target.value = nextValue;

    onChange?.(e);
  }

  return (
    <div className="flex flex-col gap-1">
      <label className={cn(srOnly && "sr-only", "text-legend text-base-3")}>
        {label}
      </label>

      <InputBase
        {...props}
        value={value}
        onChange={handleChange}
        aria-invalid={!!errorMessage}
      />

      <p className="h-[16px] text-red-500 text-sm">
        {errorMessage}
      </p>
    </div>
  );
}
