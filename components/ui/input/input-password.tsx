"use client";

import { useState, ChangeEvent } from "react";
import InputBase from "./input-base";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react/dist/ssr";

interface InputPasswordProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  srOnly?: boolean;
}

export default function InputPassword({
  label,
  errorMessage,
  srOnly = false,
  onChange,
  ...props
}: InputPasswordProps) {
  const [value, setValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

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

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-1 relative">
      <label className={srOnly ? "sr-only" : "text-legend text-base-3"}>
        {label}
      </label>

      <InputBase
        {...props}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        className="pr-10"
      />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-3 bottom-1/5 -translate-y-1/2 text-sm text-primary-1"
      >
        {showPassword ? <EyeIcon className="size-6" /> : <EyeSlashIcon className="size-6" />}
      </button>

      <p className="size-4 text-red-500 text-sm">{errorMessage}</p>
    </div>
  );
}
