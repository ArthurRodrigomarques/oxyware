"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

type NavLabelKey =
  | "home"
  | "services"
  | "impact"
  | "about"
  | "portfolio"
  | "faq"
  | "contact";

interface NavItemConfig {
  id: string;
  labelKey: NavLabelKey;
  href: string;
}

const NAV_ITEMS: readonly NavItemConfig[] = [
  { id: "hero", labelKey: "home", href: "#hero" },
  { id: "body-services", labelKey: "services", href: "#body-services" },
  { id: "impact", labelKey: "impact", href: "#impact" },
  { id: "about", labelKey: "about", href: "#about" },
  { id: "portfolio", labelKey: "portfolio", href: "#portfolio" },
  { id: "faq", labelKey: "faq", href: "#faq" },
  { id: "contact", labelKey: "contact", href: "#contact" },
];

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isHomePage =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  const handleScroll = useCallback((): void => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isHomePage]);

  const handleNavigate = (targetId: string): void => {
    setIsMobileMenuOpen(false);
    setActiveSection(targetId);

    if (isHomePage) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
        return;
      }
    }

    router.push(`/${locale}#${targetId}`);
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    if (isHomePage) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("hero");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none">
      <div className="w-full max-w-7xl px-3 sm:px-6 lg:px-8 pt-3 md:pt-4 transition-all duration-300 pointer-events-auto">
        <div
          className={cn(
            "relative flex items-center justify-between rounded-xl px-3.5 sm:px-5 py-2 transition-all duration-300",
            isScrolled
              ? "bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl shadow-purple-950/20 py-2 sm:py-2.5"
              : "bg-slate-950/45 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20"
          )}
        >
          <Link
            href={`/${locale}`}
            onClick={handleLogoClick}
            className="group flex items-center gap-2.5 rounded-lg py-1 pr-2 transition-transform duration-200 hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <Image
              src="/logo.png"
              alt="Oxyware Logo"
              width={40}
              height={40}
              priority
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Oxyware
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(): void => handleNavigate(item.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-xs xl:text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                    isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbarActiveIndicator"
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-600/40 via-blue-600/30 to-purple-600/40 border border-purple-500/50 shadow-xs shadow-purple-500/30"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.labelKey)}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/contact`}
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-purple-900/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-200 group-hover:rotate-12 transition-transform duration-300" />
              <span>{t("quote")}</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher className="flex sm:hidden" />
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={(): void => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 bg-slate-900/80 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(): void => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-[-1] bg-black/60 backdrop-blur-xs lg:hidden"
              />

              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-2 overflow-hidden rounded-xl border border-white/15 bg-slate-950/95 p-4 sm:p-5 shadow-2xl shadow-black/80 backdrop-blur-2xl lg:hidden"
              >
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.2 }}
                        onClick={(): void => handleNavigate(item.id)}
                        className={cn(
                          "flex h-12 min-h-[48px] w-full items-center justify-between rounded-lg px-4 text-sm font-medium transition-colors cursor-pointer",
                          isActive
                            ? "bg-purple-600/20 text-white border border-purple-500/30 font-semibold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span>{t(item.labelKey)}</span>
                        {isActive ? (
                          <span className="h-2 w-2 rounded-xs bg-purple-400 shadow-xs shadow-purple-400" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-slate-500" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                  <div className="hidden sm:flex items-center justify-between px-2">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Idioma
                    </span>
                    <LanguageSwitcher />
                  </div>

                  <Link
                    href={`/${locale}/contact`}
                    onClick={(): void => setIsMobileMenuOpen(false)}
                    className="flex h-12 min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-transform active:scale-98"
                  >
                    <Sparkles className="h-4 w-4 text-purple-200" />
                    <span>{t("quote")}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
