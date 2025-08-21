"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function BuiltWithPortieButtonView() {
  const componentTranslations = useTranslations("BuiltWithPortie");

  return (
    <Link
      href="/"
      className="flex flex-none items-center justify-center gap-1 text-xs text-center font-extrabold bg-primary text-primary-foreground rounded-lg px-2 py-1 transition-all hover:scale-103"
    >
      {componentTranslations("title")}
      <Heart size={16} fill="red" strokeWidth={1} />
    </Link>
  );
}
