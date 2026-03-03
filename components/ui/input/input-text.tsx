"use client";

import { ChangeEvent, forwardRef } from "react";
import { applyMask } from "@/lib/apply-mask.function";
import { cn } from "@/lib/utils";
import { InputBase } from "./input-base";

interface InputTextProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  mask?: string | string[];
  srOnly?: boolean;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(function InputText(
  { label, errorMessage, mask, srOnly = false, onChange, ...props },
  ref,
) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const nextValue = mask ? applyMask(inputValue, mask) : inputValue;

    e.target.value = nextValue;

    onChange?.(e);
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <label className={cn(srOnly && "sr-only", "text-legend text-base-3")}>{label}</label>

      <InputBase
        {...props}
        ref={ref}
        type="text"
        aria-invalid={!!errorMessage}
        onChange={handleChange}
        className="w-full pr-10"
      />

      <p className="min-h-5 text-sm text-red-600">{errorMessage}</p>
    </div>
  );
});
