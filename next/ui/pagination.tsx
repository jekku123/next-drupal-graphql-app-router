import * as React from "react";

import { cn } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { ButtonProps, buttonVariants } from "@/ui/button";
import Link from "next/link";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  isEnabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  isEnabled = true,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <div className={cn(!isEnabled && "cursor-not-allowed")}>
    <Link
      aria-current={isActive ? "page" : undefined}
      // Enable if implement smooth scrolling
      // scroll={false}
      className={cn(
        buttonVariants({
          variant: isActive ? "primary" : "tertiary",
          size,
        }),
        !isEnabled && "pointer-events-none",
        className,
      )}
      {...props}
    />
  </div>
);

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  size = "md",
  title,
  isEnabled = true,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", !isEnabled && "text-primary-200", className)}
    size={size}
    isEnabled={isEnabled}
    {...props}
  >
    <ArrowIcon className="w-6 h-6 mr-2 rotate-90" aria-hidden />
    <span>{title}</span>
  </PaginationLink>
);

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  size = "md",
  title,
  isEnabled = true,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", !isEnabled && "text-primary-200", className)}
    size={size}
    isEnabled={isEnabled}
    {...props}
  >
    <span>{title}</span>
    <ArrowIcon className="w-6 h-6 ml-2 -rotate-90" aria-hidden />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-9 w-9 items-center justify-center text-primary-600",
      className,
    )}
    {...props}
  >
    // TODO: Add ellipsis icon
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
