import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary-2 hover:bg-primary-1 active:bg-primary-3 text-base-5",
        secondary:
          "border-1 border-primary-2 hover:border-primary-1 active:border-primary-3 text-primary-2 hover:text-primary-1 active:text-primary-3",
        text: "text-primary-2 hover:text-primary-1 active:text-primary-3",
      },
      size: {
        default: "h-10 px-4 py-2 text-base font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonBaseProps {
  icon?: React.ReactNode
  iconInverse?: boolean
}

type ButtonAsButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  ButtonBaseProps & {
    isLink?: false
  }

type ButtonAsLinkProps =
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  VariantProps<typeof buttonVariants> &
  ButtonBaseProps & {
    isLink: true
    href: string
  }

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

function Button(props: ButtonProps) {
  const {
    className,
    variant = "default",
    size = "default",
    icon,
    iconInverse,
    children,
  } = props

  const content = (
    <span
      className={`flex items-center gap-2 ${iconInverse ? "flex-row-reverse" : "flex-row"
        }`}
    >
      {icon}
      {children}
    </span>
  )

  const classes = cn(buttonVariants({ variant, size, className }))

  if (props.isLink) {
    const { href, ...linkProps } = props

    return (
      <Link
        href={href}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={classes}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  const { ...buttonProps } = props

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  )
}

export { Button, buttonVariants }
