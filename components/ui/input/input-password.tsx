"use client";

import { useState, forwardRef, ChangeEvent } from "react";
import { EyeIcon, EyeSlashIcon, InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { InputBase } from "./input-base";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { cn } from "@/lib/utils";

interface InputPasswordProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  srOnly?: boolean;
  tooltip?: string;
  required?: boolean;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, errorMessage, srOnly = false, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e);
    }

    return (
      <div className="relative flex flex-col gap-1">
        <label className={cn(srOnly && "sr-only", "text-legend text-base-3")}>
          <div className="flex gap-4">
            <span className={props.required ? "required" : ""}>{label}</span>
            {props.tooltip && (
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon weight="fill" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{props.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </label>

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
          className="text-primary-1 absolute right-3 bottom-1/2 translate-y-1/2"
        >
          {showPassword ? <EyeIcon className="size-6" /> : <EyeSlashIcon className="size-6" />}
        </button>

        <p className="min-h-5 text-sm text-red-600">{errorMessage}</p>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
