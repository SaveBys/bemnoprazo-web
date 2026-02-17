"use client"

import { Controller, Control, FieldValues, Path } from "react-hook-form"
import { Checkbox } from "./checkbox"

type Option = {
  label: string
  value: string
}

interface CheckboxGroupProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  options: Option[]
  className?: string
}

export function CheckboxGroup<T extends FieldValues>({
  name,
  control,
  options,
  className
}: CheckboxGroupProps<T>) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {

        const toggle = (value: string, checked: boolean) => {
          if (checked) {
            field.onChange([...(field.value ?? []), value])
          } else {
            field.onChange(field.value?.filter((v: string) => v !== value))
          }
        }

        return (
          <div className={className}>
            {options.map(option => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={field.value?.includes(option.value)}
                onCheckedChange={(checked) =>
                  toggle(option.value, !!checked)
                }
              />
            ))}
          </div>
        )
      }}
    />
  )
}
