"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { Button } from "@/ui/button";

export type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  prevEnabled?: boolean;
  nextEnabled?: boolean;
  setNextPage?: () => void;
  setPrevPage?: () => void;
  prevPageHref?: string;
  nextPageHref?: string;
};

type PaginationComponentProps = {
  paginationProps: PaginationProps;
  focusRestoreRef?: React.RefObject<HTMLDivElement>;
};

const MaybeLink = ({ href, children }) =>
  href ? (
    <Link passHref scroll={false} href={href}>
      {children}
    </Link>
  ) : (
    children
  );

export function Pagination({
  paginationProps = {},
  focusRestoreRef,
  ...props
}: PaginationComponentProps) {
  const {
    currentPage,
    totalPages,
    nextEnabled = true,
    prevEnabled = true,
    setNextPage,
    setPrevPage,
    prevPageHref,
    nextPageHref,
  } = paginationProps;
  const t = useTranslations();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<"forward" | "back" | false>(false);
  const numbers = [currentPage, totalPages].filter((n) => !isNaN(n));

  // const restoreScroll = () => {
  //   focusRestoreRef?.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  //   const focusable = focusRestoreRef?.current.querySelector(
  //     'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  //   );
  //   if (focusable) {
  //     (focusable as HTMLElement).focus({ preventScroll: true });
  //   }
  // };

  const restoreScroll = useCallback(() => {
    focusRestoreRef?.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    const focusable = focusRestoreRef?.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) {
      (focusable as HTMLElement).focus({ preventScroll: true });
    }
  }, [focusRestoreRef]);

  // Having these methods in the handlers didnt work with app router
  // these happend before the router change
  useEffect(() => {
    setIsLoading(false);
    restoreScroll();
  }, [currentPage, restoreScroll]);

  const handlePrevClick = (e) => {
    setPrevPage && setPrevPage();
    if (prevPageHref && focusRestoreRef) {
      e.preventDefault();
      setIsLoading("back");
      void router.push(prevPageHref, { scroll: false });
      // setIsLoading(false);
      // restoreScroll();
    } else if (focusRestoreRef) {
      restoreScroll();
    }
  };

  const handleNextClick = (e) => {
    setNextPage && setNextPage();
    if (nextPageHref && focusRestoreRef) {
      e.preventDefault();
      setIsLoading("forward");
      void router.push(nextPageHref, { scroll: false });
      // setIsLoading(false);
      // restoreScroll();
    } else if (focusRestoreRef) {
      restoreScroll();
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <MaybeLink href={prevPageHref}>
        <Button
          variant="tertiary"
          disabled={!prevEnabled || !!isLoading}
          onClick={handlePrevClick}
          tabIndex={props["aria-hidden"] ? -1 : undefined}
        >
          <ArrowIcon className="w-6 h-6 mr-4 rotate-90" aria-hidden />
          {t("search-previous")}
        </Button>
      </MaybeLink>
      {numbers.length > 0 && <p>{numbers.join("/")}</p>}
      <MaybeLink href={nextPageHref}>
        <Button
          variant="tertiary"
          disabled={!nextEnabled || !!isLoading}
          onClick={handleNextClick}
          tabIndex={props["aria-hidden"] ? -1 : undefined}
        >
          {t("search-next")}
          <ArrowIcon className="w-6 h-6 ml-4 -rotate-90" aria-hidden />
        </Button>
      </MaybeLink>
    </div>
  );
}
