import Image from "next/image";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { formatDateTimestamp } from "@/lib/utils";
import { ArticleType } from "@/types/graphql";
import { useTranslations } from "next-intl";

interface ArticleProps {
  article: ArticleType;
}

export function NodeArticle({ article, ...props }: ArticleProps) {
  const t = useTranslations();

  return (
    <article {...props}>
      <HeadingPage>{article.title}</HeadingPage>
      {article.excerpt && <div className="my-4 text-xl">{article.excerpt}</div>}
      <div className="mb-4 text-scapaflow">
        {article.author?.name && (
          <span>{t("posted-by", { author: article.author.name })} - </span>
        )}
        <span>{formatDateTimestamp(article.created.timestamp, "en")}</span>
      </div>
      {article.image && (
        <figure>
          <Image
            src={article.image.url}
            width={article.image.width}
            height={article.image.height}
            style={{ width: 768, height: 480 }}
            alt={article.image.alt}
            className="object-cover"
            priority
          />
          {article.image.title && (
            <figcaption className="py-2 text-sm text-center text-scapaflow">
              {article.image.title}
            </figcaption>
          )}
        </figure>
      )}
      {article.tags?.at(0) && (
        <div className="mt-4">
          {article.tags.map((tag) => (
            <span key={tag.id} className="mr-2">
              {tag.name}
            </span>
          ))}
        </div>
      )}
      {article.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={article.body?.processed}
        />
      )}
    </article>
  );
}
