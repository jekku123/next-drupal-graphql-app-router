import { getTranslations } from "next-intl/server";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";

export type PaginationControllerProps = {
  pageRoot: string;
  currentPage: number;
  totalPages: number;
  query?: string;
};

export async function PaginationController({
  pageRoot,
  currentPage,
  totalPages,
  query,
}: PaginationControllerProps) {
  const t = await getTranslations();

  const {
    prevEnabled,
    nextEnabled,
    prevPageHref,
    nextPageHref,
    pageNumberLinks,
  } = generatePaginationProps({
    pageRoot,
    totalPages,
    currentPage,
    query,
  });

  return (
    <Pagination>
      <PaginationContent className="justify-between w-full">
        <PaginationItem>
          <PaginationPrevious
            href={prevPageHref || ""}
            title={t("search-previous")}
            scroll={false}
            isEnabled={prevEnabled}
          />
        </PaginationItem>
        <div className="flex items-center gap-2">
          {pageNumberLinks.map(({ pageNumber, href }) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={href}
                scroll={false}
                isActive={pageNumber === currentPage}
                isEnabled={pageNumber !== currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <PaginationItem>
          <PaginationNext
            href={nextPageHref || ""}
            title={t("search-next")}
            scroll={false}
            isEnabled={nextEnabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function generatePaginationProps({
  pageRoot,
  totalPages,
  currentPage,
  query,
}: {
  pageRoot: string;
  totalPages: number;
  currentPage: number;
  query?: string;
}) {
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    prevEnabled &&
    `${pageRoot}?page=${prevPage}` + (query && `&query=${query}`);
  const nextPageHref =
    nextEnabled &&
    `${pageRoot}?page=${nextPage}` + (query && `&query=${query}`);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageNumberLinks = pageNumbers.map((pageNumber) => ({
    pageNumber,
    href: `${pageRoot}?page=${pageNumber}` + (query && `&query=${query}`),
  }));

  const paginationProps = {
    prevEnabled,
    nextEnabled,
    prevPageHref,
    nextPageHref,
    pageNumbers,
    pageNumberLinks,
  };

  return paginationProps;
}
