"use client"

import { useState, forwardRef, ChangeEvent } from "react"
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react/dist/ssr"
import { InputBase } from "./input-base"

interface InputPasswordProps extends React.ComponentProps<"input"> {
  label: string
  errorMessage?: string
  srOnly?: boolean
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, errorMessage, srOnly = false, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
    }

    return (
      <div className="flex flex-col gap-1 relative">
        <label className={srOnly ? "sr-only" : "text-legend text-base-3"}>{label}</label>

        <InputBase
          ref={ref}
          {...props}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          aria-invalid={!!errorMessage}
          className="pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 bottom-1/2 translate-y-1/2 text-primary-1"
        >
          {showPassword ? <EyeIcon className="size-6" /> : <EyeSlashIcon className="size-6" />}
        </button>

        <p className="min-h-5 text-red-600 text-sm">{errorMessage}</p>
      </div>
    );
  }
)

InputPassword.displayName = "InputPassword"

export default InputPassword
