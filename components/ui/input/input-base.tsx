import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariantes = cva(
  `
  inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all 
  shrink-0 outline-none rounded-lg text-sm font-medium text-base-2
  px-4 py-2 
  `,
  {
    variants: {
      variant: {
        default: `
        bg-transparent border-2 border-primary-2 
        focus-visible:ring-primary-2/25 focus-visible:border-primary-2 focus-visible:ring-[3px]
        disabled:pointer-events-none disabled:bg-base-4 disabled:border-base-3
        aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus-visible:border-red-600 aria-[invalid=true]:focus-visible:ring-red-600/25
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariantes> {}

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  ({ className, type = "text", variant = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputVariantes({ variant, className }))}
        {...props}
      />
    );
  },
);

InputBase.displayName = "InputBase";
