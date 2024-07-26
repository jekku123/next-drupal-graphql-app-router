import { getTranslations } from "next-intl/server";

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

export type PaginationControllerProps = {
  pageRoot: string;
  currentPage: number;
  totalPages: number;
  query?: string;
  linkLimit?: number;
};

// TODO: SMOOOTH SCROLLING
export async function PaginationController({
  pageRoot,
  currentPage,
  totalPages,
  query,
  linkLimit = 3,
}: PaginationControllerProps) {
  const t = await getTranslations();

  const getUrl = (page: number) =>
    `${pageRoot}?page=${page}` + (query && `&query=${query}`);

  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref = prevEnabled && getUrl(prevPage);
  const nextPageHref = nextEnabled && getUrl(nextPage);

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
      href: getUrl(page),
    }))
    .filter(({ page }) => page >= startPage && page <= endPage);

  return (
    <Pagination>
      <PaginationContent className="justify-center w-full">
        <PaginationItem>
          <PaginationFirst
            href={getUrl(1)}
            title={t("search-first")}
            isEnabled={currentPage > 1}
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
            href={getUrl(totalPages)}
            title={t("search-last")}
            isEnabled={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
