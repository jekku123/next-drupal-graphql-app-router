"use client";

import { cn } from "@/lib/utils";
import {
  BaseContainerProps,
  Rename,
} from "@elastic/react-search-ui/lib/esm/types";
import type { SearchContextState } from "@elastic/search-ui";
import { useTranslations } from "next-intl";

type PagingInfoContainerContext = Pick<
  SearchContextState,
  "pagingStart" | "pagingEnd" | "resultSearchTerm" | "totalResults"
>;

type PagingInfoViewProps = Rename<
  BaseContainerProps & PagingInfoContainerContext,
  {
    pagingStart: "start";
    resultSearchTerm: "searchTerm";
    pagingEnd: "end";
  }
>;

export function PagingInfoView({
  className,
  end,
  searchTerm,
  totalResults,
  ...rest
}: PagingInfoViewProps & React.HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations();

  return (
    <div className={cn(className, "text-sm")} {...rest}>
      {t("search-showing")} <strong>{end}</strong> {t("search-out-of")}{" "}
      <strong>{totalResults}</strong>
      {searchTerm && (
        <>
          {" "}
          {t("search-for")}: <em>{searchTerm}</em>
        </>
      )}
    </div>
  );
}
