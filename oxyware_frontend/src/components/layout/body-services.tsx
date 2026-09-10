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
  MoveHorizontal,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const services = t.raw("services") as readonly ServiceItem[];

  const filteredServices: readonly ServiceItem[] = activeCategory === "all"
    ? services
    : services.filter((service: ServiceItem) => service.category === activeCategory);

  const handleScrollTo = (direction: "left" | "right"): void => {
    if (!scrollContainerRef.current) {
      return;
    }
    const scrollOffset = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollOffset : scrollOffset,
      behavior: "smooth",
    });
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
              "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl px-2 leading-tight"
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
              "pt-4 sm:pt-6 flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 max-w-full pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            {FILTER_OPTIONS.map((filter: FilterOption) => {
              const isActive = activeCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveCategory(filter.key)}
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
          <motion.div
            ref={scrollContainerRef}
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
                      "w-[84vw] max-w-[320px] sm:max-w-[360px] shrink-0 snap-start",
                      "md:w-auto md:max-w-none md:shrink md:snap-align-none",
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
                          <h3 className={cn("text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug")}>
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

          <div className={cn("flex md:hidden items-center justify-between mt-3 px-1")}>
            <div className={cn("inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono")}>
              <MoveHorizontal className={cn("w-3.5 h-3.5 text-purple-400")} />
              <span>{t("swipe_hint")}</span>
            </div>
            <div className={cn("flex items-center gap-2")}>
              <button
                type="button"
                onClick={() => handleScrollTo("left")}
                aria-label="Previous service"
                className={cn(
                  "w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                )}
              >
                <ChevronLeft className={cn("w-4 h-4")} />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("right")}
                aria-label="Next service"
                className={cn(
                  "w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                )}
              >
                <ChevronRight className={cn("w-4 h-4")} />
              </button>
            </div>
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


