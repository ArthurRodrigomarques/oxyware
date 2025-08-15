"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Instagram,
  Mail,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta_section");

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-purple-800 to-blue-800 ">
      <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />

      <div className="absolute top-10 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-10 right-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <h2 className="mb-8 text-5xl md:text-6xl font-bold leading-tight">
          {t("title")} <span className="text-gradient">{t("highlight")}</span>?
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
          {t("description")}
        </p>

        <div className="mx-auto flex max-w-[600px] flex-col gap-6 sm:flex-row justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-2xl px-10 py-5 text-xl font-semibold hover:scale-[1.05] transition-transform cursor-pointer"
          >
            {t("start_project")}
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="glass-card rounded-full px-10 py-5 text-xl font-semibold min-w-[250px] hover:bg-white/10 cursor-pointer"
          >
            <MessageCircle className="mr-3 h-6 w-6" />
            {t("contact_us")}
          </Button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-4">{t("contact_through")} </h2>
          <div className="flex justify-center gap-6 text-white">
            <a
              href="mailto:seuemail@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-800"
            >
              <Mail size={20} />
              Gmail
            </a>
            <a
              href="https://wa.me/5513996547656"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-600"
            >
              <MessageSquare size={20} />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/oxyware"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500"
            >
              <Instagram size={20} />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
