"use client"

import { ChangeEvent } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"
import { InputBase } from "./input-base"

interface InputSearchProps extends React.ComponentProps<"input"> {
  label: string
  errorMessage?: string
  srOnly?: boolean
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
    onChange?.(e)
  }

  return (
    <div className={cn("relative flex flex-col gap-1", props.className)}>
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

        <MagnifyingGlassIcon className="text-base-3 absolute top-1/2 right-3 size-5 -translate-y-1/2" />
      </div>
      {errorMessage && <p className="min-h-5 text-sm text-red-600">{errorMessage}</p>}
    </div>
  )
}
