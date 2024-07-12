import NextImage from "next/image";

import { FragmentMediaImageFragment } from "@/lib/gql/graphql";

export function MediaImage({ media }: { media: FragmentMediaImageFragment }) {
  if (!media) {
    return null;
  }

  const { url, width, height, alt, title } = media.mediaImage;

  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      alt={alt || "Image"}
      title={title || ""}
      className="object-cover h-auto max-w-full"
      priority
    />
  );
}
