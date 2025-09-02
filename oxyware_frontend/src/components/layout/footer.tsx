"use client";

import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-card border-t border-border/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gradient">
            {t("companyName")}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t("companyDescription")}
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" /> <span>{t("contact.email")}</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5" /> <span>{t("contact.phone")}</span>
            </div>
            <div className="flex items-start space-x-3 text-muted-foreground hover:text-primary transition-colors">
              <MapPin className="w-5 h-5 mt-0.5" />{" "}
              <span>{t("contact.address")}</span>
            </div>
          </div>

          <div className="flex space-x-4 mt-3">
            <Link
              href="https://instagram.com/oxyware"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="p-3 rounded-xl hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </Link>

            <Link
              href="https://www.linkedin.com/company/oxyware/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="p-3 rounded-xl hover:scale-110 transition-transform"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gradient">Links Rápidos</h4>
          <ul className="space-y-3">
            <li>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary p-0"
                onClick={() => scrollToSection("header")}
              >
                {t("links.quick1.name")}
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary p-0"
                onClick={() => scrollToSection("body-services")}
              >
                {t("links.quick2.name")}
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary p-0"
                onClick={() => scrollToSection("about")}
              >
                {t("links.quick3.name")}
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary p-0"
                onClick={() => scrollToSection("portfolio")}
              >
                {t("links.quick4.name")}
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary p-0"
                onClick={() => scrollToSection("about-section")}
              >
                {t("links.quick5.name")}
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary p-0"
                onClick={() => scrollToSection("faq")}
              >
                {t("links.quick6.name")}
              </Button>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gradient">
            {t("newsletter.title")}
          </h4>
          <ul className="space-y-3">
            <li className="text-muted-foreground hover:text-primary">
              {t("links.service1")}
            </li>
            <li className="text-muted-foreground hover:text-primary">
              {t("links.service2")}
            </li>
            <li className="text-muted-foreground hover:text-primary">
              {t("links.service3")}
            </li>
            <li className="text-muted-foreground hover:text-primary">
              {t("links.service4")}
            </li>
            <li className="text-muted-foreground hover:text-primary">
              {t("links.service5")}
            </li>
            <li className="text-muted-foreground hover:text-primary">
              {t("links.service6")}
            </li>
          </ul>
        </div>

        {/* Newsletter & Legal */}
        <div className="space-y-6">
          <p className="text-muted-foreground">{t("newsletter.description")}</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder={t("newsletter.placeholder")}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
            />
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
              {t("newsletter.button")}
            </Button>
          </div>

          <div className="space-y-3 mt-6">
            <h5 className="font-semibold">Legal</h5>
            <ul className="space-y-2">
              {[
                t("links.legal1.name"),
                t("links.legal2.name"),
                t("links.legal3.name"),
              ].map((label, i) => (
                <li key={i}>
                  <Link href={`/${locale}/privacypolicy`} passHref>
                    <Button
                      variant="link"
                      className="text-sm text-muted-foreground hover:text-primary p-0"
                    >
                      {label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 mt-12">
        <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">{t("bottomBar.copyright")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("bottomBar.cnpj")}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-sm text-muted-foreground">
              {t("bottomBar.madeBy")}
            </div>

            <Button
              variant="outline"
              className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all duration-300 hover:scale-110 group"
              onClick={scrollToTop}
            >
              <ArrowUp className="w-5 h-5 text-primary group-hover:-translate-y-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
