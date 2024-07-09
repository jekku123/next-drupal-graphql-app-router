import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { formatDateTimestamp } from "@/lib/utils";
import { ProductType } from "@/types/graphql";

interface ProductProps {
  product: ProductType;
}

export function NodeProduct({ product, ...props }: ProductProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <article {...props}>
      <HeadingPage>{product.title}</HeadingPage>
      {product.excerpt && <div className="my-4 text-xl">{product.excerpt}</div>}
      <div className="mb-4 text-scapaflow">
        {product.author?.name && (
          <span>{t("posted-by", { author: product.author.name })} - </span>
        )}
        <span>
          {formatDateTimestamp(product.created.timestamp, router.locale)}
        </span>
      </div>
      {product.image && (
        <figure>
          <Image
            src={product.image.url}
            width={product.image.width}
            height={product.image.height}
            style={{ width: 768, height: 480 }}
            alt={product.image.alt}
            className="object-cover"
            priority
          />
          {product.image.title && (
            <figcaption className="py-2 text-sm text-center text-scapaflow">
              {product.image.title}
            </figcaption>
          )}
        </figure>
      )}
      <p>{product.pricePerUnit}</p>
      {product.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={product.body?.processed}
        />
      )}
    </article>
  );
}
