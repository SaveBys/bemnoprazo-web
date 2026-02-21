import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariantes = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: `
        bg-transparent border-2 border-primary-2 rounded-lg focus-visible:ring-primary-2/25 
        focus-visible:border-primary-2 px-4 py-2 text-sm font-medium text-base-2
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariantes> {}

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
    )
  }
)

InputBase.displayName = "InputBase"
