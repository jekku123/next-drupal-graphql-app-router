"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { Icons } from "../icons";

export function SocialShare() {
  const [pageUrl, setPageUrl] = useState<string>("");
  const t = useTranslations();

  useEffect(() => {
    const currentUrl = encodeURIComponent(window.location.href);
    setPageUrl(currentUrl);
  }, []);

  const data = [
    {
      id: 1,
      location: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      icon: <Icons.facebook className="block w-16 h-16 text-primary-600" />,
    },
    {
      id: 2,
      location: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${pageUrl}`,
      icon: <Icons.twitter className="block w-16 h-16 text-primary-600" />,
    },
    {
      id: 3,
      location: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`,
      icon: <Icons.linkedIn className="block w-16 h-16 text-primary-600" />,
    },
  ];

  return (
    <div>
      <p className="text-center">{t("share-page")}</p>
      <ul className="flex flex-wrap justify-center">
        {data?.map(({ id, url, icon, location }) => (
          <li className="m-4" key={id}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {icon}
              {location && (
                <span className="sr-only">
                  {t("share-to", {
                    location,
                  })}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
