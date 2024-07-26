import * as React from "react";

import { LinkWithLocale } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow-down.svg";
import DoubleArrowIcon from "@/styles/icons/double-arrow.svg";

import { pathnames } from "@/i18n";
import { ButtonProps, buttonVariants } from "@/ui/button";

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

type PaginationLinkProps<Pathname extends keyof typeof pathnames | string> = {
  isActive?: boolean;
  isEnabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof LinkWithLocale<Pathname>>;

/**
 * Pagination link component
 * It uses the `LinkWithLocale` component from `@/lib/navigation` to create a link
 * with the current locale.
 */
const PaginationLink = <Pathname extends keyof typeof pathnames | string>({
  className,
  isActive,
  isEnabled = true,
  size = "icon",
  ...props
}: PaginationLinkProps<Pathname>) => (
  <div className={cn(!isEnabled && "cursor-not-allowed")}>
    <LinkWithLocale
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "primary" : "tertiary",
          size,
        }),
        !isEnabled && "pointer-events-none",
        className,
      )}
      scroll={false}
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

const PaginationFirst = ({
  className,
  size = "md",
  title,
  isEnabled = true,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    className={cn("gap-1 pr-2.5", !isEnabled && "text-primary-200", className)}
    size={size}
    isEnabled={isEnabled}
    {...props}
  >
    <DoubleArrowIcon
      className="w-4 h-4 mr-2 rotate-180"
      fill="currentColor"
      aria-hidden
    />
    <span>{title}</span>
  </PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationLast = ({
  className,
  size = "md",
  title,
  isEnabled = true,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    className={cn("gap-1 pr-2.5", !isEnabled && "text-primary-200", className)}
    size={size}
    isEnabled={isEnabled}
    {...props}
  >
    <span>{title}</span>
    <DoubleArrowIcon className="w-4 h-4 ml-2" aria-hidden fill="currentColor" />
  </PaginationLink>
);
PaginationLast.displayName = "PaginationLast";

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
    {/* ADD ELLIPSIS ICON */}
    <span>...</span>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
