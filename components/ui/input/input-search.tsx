"use client";

import { useState, ChangeEvent } from "react";
import InputBase from "./input-base";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface InputSearchProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  srOnly?: boolean;
}

export default function InputSearch({
  label,
  errorMessage,
  srOnly = false,
  onChange,
  ...props
}: InputSearchProps) {
  const [value, setValue] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;
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
    <div className={cn("flex flex-col gap-1 relative", props.className)}>
      <label className={srOnly ? "sr-only" : "text-legend text-base-3"}>
        {label}
      </label>

      <div className="relative">
        <InputBase
          {...props}
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full pr-10"
        />

        <MagnifyingGlassIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-base-3"
        />

      </div>
      {
        errorMessage &&
        <p className="text-red-500 text-sm">{errorMessage}</p>
      }
    </div>
  );
}
