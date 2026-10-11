"use client";

import {
  Instagram,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useTranslations } from "next-intl";
import QuoteButton from "../QuoteButton";
import { CONTACT } from "@/lib/contact";

export default function CTA() {
  const t = useTranslations("cta_section");

  return (
    <section
      id="contact"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-br text-white scroll-mt-20"
    >
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
          <QuoteButton />

        </div>

        <div className="mt-8 flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-4">
            {t("contact_through")}{" "}
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 text-white sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href={CONTACT.emailHref}
              className="flex items-center gap-2 hover:text-blue-800"
            >
              <Mail size={20} />
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsappHref}
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
