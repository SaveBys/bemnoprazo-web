import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  valid,
  ...props
}: React.ComponentProps<"textarea"> & { valid?: boolean }) {
  return (
    <textarea
      aria-invalid={!valid}
      data-slot="textarea"
      className={cn(
        "border-primary-2 placeholder:text-muted-foreground focus-visible:ring-primary-2/25 focus-visible:border-primary-2 disabled:bg-base-4 disabled:border-base-3 flex field-sizing-content min-h-16 w-full rounded-md border-2 bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed aria-invalid:border-red-600 aria-invalid:focus-visible:border-red-600 aria-invalid:focus-visible:ring-red-600/25 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
