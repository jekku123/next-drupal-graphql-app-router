"use client";

import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { formatDateTimestamp } from "@/lib/utils";
interface ArticleTeaserProps {
  article: FragmentArticleTeaserFragment;
}

export function ArticleTeaser({ article }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.author?.name;

  // TODO: locale..
  const date = formatDateTimestamp(article.created.timestamp, "en");
  return (
    <Link
      href={article.path}
      className="relative grid h-full p-4 transition-all bg-white border rounded border-finnishwinter hover:shadow-md"
    >
      <h3 className="mb-2 font-bold line-clamp-2 text-heading-xs">
        {article.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      {article.image && (
        <Image
          src={article.image.url}
          width={384}
          height={240}
          alt={article.image.alt}
          className="object-cover max-w-full"
        />
      )}
    </Link>
  );
}
