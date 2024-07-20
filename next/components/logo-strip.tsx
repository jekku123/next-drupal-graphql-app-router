import { ReactElement } from "react";

import { useTranslations } from "next-intl";
import { Icons } from "./icons";

interface Logo {
  image: ReactElement;
  label: string;
  id: string;
}

const logos: Logo[] = [
  {
    image: (
      <Icons.reactIcon className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "React logo",
    id: "react-logo",
  },
  {
    image: (
      <Icons.nextJsIcon className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "NextJS logo",
    id: "nextjs-logo",
  },
  {
    image: (
      <Icons.tailwindCssIcon className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Tailwind CSS logo",
    id: "tailwindcss-logo",
  },
  {
    image: (
      <Icons.drupalIcon className="h-auto max-h-[5rem] w-[100%] max-w-[11.25rem] align-middle" />
    ),
    label: "Drupal logo",
    id: "drupal-logo",
  },
];

export function LogoStrip() {
  const t = useTranslations();

  return (
    <section>
      <span className="sr-only">{t("brand-logos")}</span>
      <ul className="flex flex-wrap justify-center p-4">
        {logos?.map(({ id, image, label }) => (
          <li
            key={id}
            className="box-pack-center mb-4 flex max-w-[50%] items-center justify-center p-4"
          >
            {image}
            <span className="sr-only">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
