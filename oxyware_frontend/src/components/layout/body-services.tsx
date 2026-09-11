"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  Smartphone,
  Globe,
  Code,
  Zap,
  Shield,
  Rocket,
  TrendingUp,
  PenTool,
  Share2,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ServiceItem {
  readonly id: string;
  readonly category: "software" | "infra" | "growth";
  readonly code: string;
  readonly icon: string;
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly deliverables: readonly string[];
  readonly technologies: readonly string[];
}

type CategoryFilter = "all" | "software" | "infra" | "growth";

interface FilterOption {
  readonly key: CategoryFilter;
  readonly labelKey: "filter_all" | "filter_software" | "filter_infra" | "filter_growth";
}

const FILTER_OPTIONS: readonly FilterOption[] = [
  { key: "all", labelKey: "filter_all" },
  { key: "software", labelKey: "filter_software" },
  { key: "infra", labelKey: "filter_infra" },
  { key: "growth", labelKey: "filter_growth" },
];

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Globe,
  Code,
  Zap,
  Shield,
  Rocket,
  TrendingUp,
  PenTool,
  Share2,
};

export default function BodyServices(): React.JSX.Element {
  const t = useTranslations("services_section");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const services = t.raw("services") as readonly ServiceItem[];

  const filteredServices: readonly ServiceItem[] = activeCategory === "all"
    ? services
    : services.filter((service: ServiceItem) => service.category === activeCategory);

  const handleCategoryChange = (key: CategoryFilter): void => {
    setActiveCategory(key);
    setCurrentSlideIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleScroll = (): void => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector("article");
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(container.scrollLeft / cardWidth);
    setCurrentSlideIndex(Math.max(0, Math.min(index, filteredServices.length - 1)));
  };

  const handleScrollTo = (direction: "left" | "right"): void => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector("article");
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const nextIndex = direction === "left"
      ? Math.max(0, currentSlideIndex - 1)
      : Math.min(filteredServices.length - 1, currentSlideIndex + 1);

    container.scrollTo({
      left: nextIndex * cardWidth,
      behavior: "smooth",
    });
    setCurrentSlideIndex(nextIndex);
  };

  return (
    <section
      className={cn(
        "relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden"
      )}
      id="body-services"
    >
      <div id="services" className={cn("absolute -top-24 left-0 pointer-events-none")} />

      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        )}
      />

      <div className={cn("container relative mx-auto max-w-7xl")}>
        <div className={cn("flex flex-col items-center text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4")}>
          <div
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono tracking-widest text-zinc-400"
            )}
          >
            <Terminal className={cn("w-3.5 h-3.5 text-purple-400")} />
            <span>{t("badge")}</span>
          </div>

          <h2
            className={cn(
              "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl px-2 leading-tight font-orbitron"
            )}
          >
            {t("headline")}
          </h2>

          <p
            className={cn(
              "text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed px-2"
            )}
          >
            {t("services_description")}
          </p>

          <div
            className={cn(
              "pt-4 sm:pt-6 flex flex-wrap justify-center gap-2 max-w-full pb-2 sm:pb-0 px-2"
            )}
          >
            {FILTER_OPTIONS.map((filter: FilterOption) => {
              const isActive = activeCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => handleCategoryChange(filter.key)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer shrink-0",
                    isActive
                      ? "text-white bg-white/10 border border-white/20 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
                  )}
                >
                  {t(filter.labelKey)}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className={cn(
                        "absolute inset-0 rounded-full border border-purple-500/50 bg-purple-500/10 pointer-events-none"
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className={cn("relative")}>
          <button
            type="button"
            onClick={() => handleScrollTo("left")}
            disabled={currentSlideIndex === 0}
            aria-label="Previous service"
            className={cn(
              "md:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-white/20 bg-slate-950/85 backdrop-blur-md flex items-center justify-center text-white shadow-xl active:scale-90 transition-all cursor-pointer",
              currentSlideIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ChevronLeft className={cn("w-4 h-4")} />
          </button>

          <button
            type="button"
            onClick={() => handleScrollTo("right")}
            disabled={currentSlideIndex >= filteredServices.length - 1}
            aria-label="Next service"
            className={cn(
              "md:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-white/20 bg-slate-950/85 backdrop-blur-md flex items-center justify-center text-white shadow-xl active:scale-90 transition-all cursor-pointer",
              currentSlideIndex >= filteredServices.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ChevronRight className={cn("w-4 h-4")} />
          </button>

          <motion.div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            layout
            className={cn(
              "flex md:grid md:grid-cols-2 lg:grid-cols-3",
              "overflow-x-auto md:overflow-hidden",
              "snap-x snap-mandatory md:snap-none",
              "gap-4 md:gap-px",
              "bg-transparent md:bg-white/10",
              "rounded-none md:rounded-2xl",
              "border-0 md:border md:border-white/10",
              "shadow-none md:shadow-2xl",
              "-mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0",
              "pb-4 md:pb-0 pt-1",
              "scroll-smooth",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service: ServiceItem) => {
                const IconComponent = ICONS_MAP[service.icon];

                return (
                  <motion.article
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "group relative bg-slate-950 hover:bg-slate-900/90 transition-colors duration-300",
                      "p-6 sm:p-8 flex flex-col justify-between",
                      "w-[85vw] max-w-[340px] shrink-0 snap-center mx-auto",
                      "md:w-auto md:max-w-none md:shrink md:snap-align-none md:mx-0",
                      "rounded-2xl md:rounded-none",
                      "border border-white/10 md:border-0",
                      "shadow-xl md:shadow-none"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      )}
                    />

                    <div className={cn("space-y-5 sm:space-y-6")}>
                      <div className={cn("flex items-center justify-between")}>
                        <div className={cn("flex items-center gap-3")}>
                          <span
                            className={cn(
                              "font-mono text-xs font-semibold text-zinc-500 tracking-wider group-hover:text-purple-400 transition-colors"
                            )}
                          >
                            {service.code}
                          </span>
                          <span
                            className={cn(
                              "text-[11px] font-mono uppercase tracking-widest font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors"
                            )}
                          >
                            {service.tag}
                          </span>
                        </div>

                        <div
                          className={cn(
                            "w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/[0.05] transition-all duration-300"
                          )}
                        >
                          <ArrowUpRight
                            className={cn(
                              "w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                            )}
                          />
                        </div>
                      </div>

                      <div className={cn("space-y-2.5 sm:space-y-3")}>
                        <div className={cn("flex items-center gap-3")}>
                          {IconComponent && (
                            <div
                              className={cn(
                                "w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-purple-400 group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-300 shrink-0"
                              )}
                            >
                              <IconComponent className={cn("w-4 h-4")} />
                            </div>
                          )}
                          <h3 className={cn("text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug font-orbitron")}>
                            {service.title}
                          </h3>
                        </div>

                        <p className={cn("text-xs sm:text-sm text-zinc-400 leading-relaxed")}>
                          {service.description}
                        </p>
                      </div>

                      <div className={cn("pt-4 border-t border-white/[0.06] space-y-2.5")}>
                        <span className={cn("text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-semibold block")}>
                          {t("deliverables_label")}
                        </span>
                        <ul className={cn("space-y-2")}>
                          {service.deliverables.map((deliverable: string, deliverableIndex: number) => (
                            <li
                              key={deliverableIndex}
                              className={cn("text-xs text-zinc-300 flex items-start gap-2 leading-snug")}
                            >
                              <CheckCircle2 className={cn("w-3.5 h-3.5 text-purple-400/80 shrink-0 mt-0.5")} />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={cn("pt-5 sm:pt-6 border-t border-white/[0.06] mt-5 sm:mt-6 flex flex-wrap gap-1.5")}>
                      {service.technologies.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-mono tracking-wide text-zinc-400 bg-white/[0.03] border border-white/[0.06] group-hover:border-white/10 group-hover:text-zinc-300 transition-colors"
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className={cn("flex md:hidden items-center justify-center gap-4 mt-6")}>
            <button
              type="button"
              onClick={() => handleScrollTo("left")}
              disabled={currentSlideIndex === 0}
              aria-label="Previous service"
              className={cn(
                "w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 cursor-pointer active:scale-90",
                currentSlideIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/10 hover:border-white/30"
              )}
            >
              <ChevronLeft className={cn("w-5 h-5")} />
            </button>

            <div
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-sm"
              )}
            >
              <span className={cn("text-white font-semibold")}>
                {String(currentSlideIndex + 1).padStart(2, "0")}
              </span>
              <span className={cn("text-zinc-600")}>/</span>
              <span className={cn("text-zinc-400")}>
                {String(filteredServices.length).padStart(2, "0")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleScrollTo("right")}
              disabled={currentSlideIndex >= filteredServices.length - 1}
              aria-label="Next service"
              className={cn(
                "w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 cursor-pointer active:scale-90",
                currentSlideIndex >= filteredServices.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/10 hover:border-white/30"
              )}
            >
              <ChevronRight className={cn("w-5 h-5")} />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "mt-10 sm:mt-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          )}
        >
          <div className={cn("space-y-1 text-center md:text-left")}>
            <h4 className={cn("text-lg font-semibold text-white tracking-tight")}>
              {t("cta_title")}
            </h4>
            <p className={cn("text-sm text-zinc-400")}>
              {t("cta_description")}
            </p>
          </div>

          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-zinc-200 text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl shrink-0 cursor-pointer"
            )}
          >
            <span>{t("cta_button")}</span>
            <ArrowUpRight className={cn("w-4 h-4")} />
          </Link>
        </div>
      </div>
    </section>
  );
}


