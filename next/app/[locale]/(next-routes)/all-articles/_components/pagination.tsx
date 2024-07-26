"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export type PaginationControllerProps = {
  pageRoot: string;
  currentPage: number;
  totalPages: number;
  query?: string;
  linkLimit?: number;
};

// TODO: SMOOOTH SCROLLING
export function PaginationController({
  pageRoot,
  currentPage,
  totalPages,
  query,
  linkLimit = 3,
}: PaginationControllerProps) {
  const t = useTranslations();

  const getLocaleHref = (page: number) => {
    return {
      pathname: pageRoot,
      query: query ? { page, query } : { page },
    };
  };

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const firstPageEnabled = currentPage > 1;
  const lastPageEnabled = currentPage < totalPages;
  const firstPageHref = firstPageEnabled && getLocaleHref(1);
  const lastPageHref = lastPageEnabled && getLocaleHref(totalPages);

  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;
  const prevPageHref = prevEnabled && getLocaleHref(prevPage);
  const nextPageHref = nextEnabled && getLocaleHref(nextPage);

  const halfLimit = Math.floor(linkLimit / 2);

  let startPage = currentPage - halfLimit;
  let endPage = currentPage + halfLimit;

  if (startPage < 1) {
    startPage = 1;
    endPage = linkLimit;
  }
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - linkLimit + 1;
  }
  if (startPage < 1) {
    startPage = 1;
  }

  const arr = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageLinks = arr
    .map((page) => ({
      page,
      href: getLocaleHref(page),
    }))
    .filter(({ page }) => page >= startPage && page <= endPage);

  useEffect(() => {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  }, [currentPage]);

  return (
    <Pagination>
      <PaginationContent className="justify-center w-full">
        <PaginationItem>
          <PaginationFirst
            href={firstPageHref || ""}
            title={t("search-first")}
            isEnabled={firstPageEnabled}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href={prevPageHref || ""}
            title={t("search-previous")}
            isEnabled={prevEnabled}
          />
        </PaginationItem>
        {currentPage > halfLimit + 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageLinks.map(({ page, href }) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={href}
              isActive={page === currentPage}
              isEnabled={page !== currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={nextPageHref || ""}
            title={t("search-next")}
            isEnabled={nextEnabled}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            href={lastPageHref || ""}
            title={t("search-last")}
            isEnabled={lastPageEnabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
