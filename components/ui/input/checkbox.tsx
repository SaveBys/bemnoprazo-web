import React from "react"
import { Field, FieldLabel } from "../field"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckboxBase } from "./checkbox-base"

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentProps<typeof CheckboxPrimitive.Root> & { label: string }
>(({ label, ...props }, ref) => {

  return (
    <Field className="text-legend text-base-2" orientation="horizontal">

      <CheckboxBase
        ref={ref}
        {...props}
      />

      <FieldLabel>
        {label}
      </FieldLabel>

    </Field>
  )
})

Checkbox.displayName = "Checkbox"
