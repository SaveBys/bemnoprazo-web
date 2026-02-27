"use client";

import { useState, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { InputBase } from "./input-base";

interface InputSearchProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  srOnly?: boolean;
}

export default function InputSearch({
  label,
  errorMessage,
  srOnly = false,
  value,
  onChange,
  ...props
}: InputSearchProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;

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
    <div className={cn("flex flex-col gap-1 relative", props.className)}>
      <label className={srOnly ? "sr-only" : "text-legend text-base-3"}>{label}</label>

      <div className="relative">
        <InputBase
          {...props}
          {...(value !== undefined ? { value } : {})}
          type="text"
          aria-invalid={!!errorMessage}
          onChange={handleChange}
          className="w-full pr-10"
        />

        <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-base-3" />
      </div>
      {errorMessage && <p className="min-h-5 text-red-600 text-sm">{errorMessage}</p>}
    </div>
  );
}
