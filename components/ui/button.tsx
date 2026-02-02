import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary-2 hover:bg-primary-1 active:bg-primary-3 text-base-5",
        secondary: "border-1 border-primary-2 hover:border-primary-1 active:border-primary-3 text-primary-2 hover:text-primary-1 active:text-primary-3",
        text: "text-primary-2 hover:text-primary-1 active:text-primary-3"
      },
      size: {
        default: "h-12 px-6 py-3 text-base font-bold"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  icon?: React.ReactNode;
  iconInverse?: boolean;
  isLink?: false;
}) {

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}>
      <span className={`flex items-center gap-2 ${props.iconInverse ? "flex-row-reverse" : "flex-row"}`}>
        {props.icon}
        {props.children}
      </span>
    </button>
  )
}

export { Button, buttonVariants }
