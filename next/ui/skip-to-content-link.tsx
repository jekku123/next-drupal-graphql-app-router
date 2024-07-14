import Link from "next/link";
import React from "react";

interface ContentLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipToContentLink({ href, children }: ContentLinkProps) {
  return (
    <Link
      href={href}
      className="tracking-wide sr-only font-inter text-primary-600 underline-offset-4 focus-visible:not-sr-only"
      tabIndex={0}
    >
      {children}
    </Link>
  );
}
