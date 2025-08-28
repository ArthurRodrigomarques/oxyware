// src/components/layout/header.tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Code, Smartphone, Globe } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import QuoteButton from "../QuoteButton";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <div
      className="min-h-screen flex flex-col items-center text-center px-4 text-white"
      id="header"
    >
      <LanguageSwitcher />
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="rounded-full mt-4"
      />
      <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          OxyWare
        </span>
        <br />
        <div className="text-3xl md:text-6xl">
          <span className="text-foreground">{t("codigoInteligente")}</span>
          <br />
          <span className="text-foreground">{t("impactoReal")}</span>
        </div>
      </h1>

      <h2 className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-gray-400">
        {t("descricao")}
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
        <QuoteButton phone="+5513988622256" />
      </div>

      <div className="flex justify-center gap-12 opacity-60">
        <div className="flex flex-col items-center gap-2">
          <Smartphone className="h-8 w-8 text-purple-100" />
          <span className="text-sm">{t("apps")}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Globe className="h-8 w-8 text-blue-400" />
          <span className="text-sm">{t("websites")}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Code className="h-8 w-8 text-green-400" />
          <span className="text-sm">{t("sistemas")}</span>
        </div>
      </div>
    </div>
  );
}
