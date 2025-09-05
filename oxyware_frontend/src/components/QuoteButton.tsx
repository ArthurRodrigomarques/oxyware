"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function QuoteButton() {
  const t = useTranslations("QuoteButton");
  const locale = useLocale();

  return (
    <Button
      asChild
      size="lg"
      className="px-8 py-4 rounded-full min-w-[200px] bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <Link href={`/${locale}/contact`}>
        {t("label")}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
