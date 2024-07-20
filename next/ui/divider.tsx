import { cn } from "@/lib/utils";
import React from "react";

export type DividerProps = React.HTMLAttributes<HTMLHRElement>;

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        className={cn("mx-auto my-12 border-t border-finnishwinter", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";
