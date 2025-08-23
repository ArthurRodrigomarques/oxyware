"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface QuoteButtonProps {
  phone?: string;
}

export default function QuoteButton({ phone }: QuoteButtonProps) {
  const t = useTranslations("QuoteButton");

  const phoneNumber = phone || "+55 (13) 99654-7656";

  return (
    <Button
      asChild
      size="lg"
      className="px-8 py-4 rounded-full min-w-[200px] bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("label")}
        <ArrowRight className="ml-2 h-5 w-5" />
      </a>
    </Button>
  );
}
