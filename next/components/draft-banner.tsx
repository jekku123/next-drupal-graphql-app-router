"use client";

import { usePathname } from "next/navigation";

// export function useIsPreviewBannerVisible() {
//   const { isPreview } = useRouter();

//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const isIframe = window.top !== window.self;
//     setIsVisible(isPreview && !isIframe);
//   }, [isPreview]);

//   return isVisible;
// }

export function DraftBanner({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) {
    return null;
  }

  const pathname = usePathname();

  return (
    <div className="absolute top-0 z-50 w-full px-2 py-2 text-center bg-steelgray text-mischka">
      This page is a draft.{" "}
      {/* eslint-disable @next/next/no-html-link-for-pages */}
      <a
        href={`/api/disable-draft?callbackPath=${pathname}`}
        className="underline"
      >
        Click here
      </a>{" "}
      to exit draft mode.
    </div>
  );
}
