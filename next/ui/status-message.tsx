import { useTranslations } from "next-intl";
import React from "react";
import { cva } from "cva";

import { cn } from "@/lib/utils";
import Success from "@/styles/icons/checkmark.svg";
import Error from "@/styles/icons/error.svg";
import Warning from "@/styles/icons/warning.svg";

export const variants = cva(
  "text-md text-steelgray w-full relative py-6 px-16",
  {
    variants: {
      level: {
        info: "bg-info/15",
        success: "bg-success/15",
        warning: "bg-warning/15",
        error: "bg-error/15",
      },
    },
    defaultVariants: {
      level: "info",
    },
  },
);

export interface StatusMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  level?: "info" | "success" | "warning" | "error";
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export const StatusMessage = React.forwardRef<
  HTMLDivElement,
  StatusMessageProps
>(({ level = "info", title, className, children, ...props }, ref) => {
  const t = useTranslations();

  const [Icon, color] = {
    info: [Warning, "text-info"],
    success: [Success, "text-success"],
    warning: [Warning, "text-warning"],
    error: [Error, "text-error"],
  }[level];

  return (
    <div
      role="alert"
      className={cn(variants({ level }), className)}
      ref={ref}
      {...props}
    >
      <Icon className={cn("absolute left-6 top-6 h-6 w-6", color)} />
      <h3 className="mb-2 font-bold text-md">
        {title ?? t(`statusmessage-${level}`)}
      </h3>
      {children}
    </div>
  );
});
StatusMessage.displayName = "StatusMessage";
