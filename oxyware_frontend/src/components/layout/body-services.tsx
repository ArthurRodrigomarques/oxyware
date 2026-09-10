"use client";

import { useState } from "react";
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

export default function BodyServices() {
  const t = useTranslations("services_section");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const services = t.raw("services") as readonly ServiceItem[];

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter((service: ServiceItem) => service.category === activeCategory);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden" id="body-services">
      <div id="services" className="absolute -top-24 left-0 pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono tracking-widest text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl">
            {t("headline")}
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            {t("services_description")}
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-2">
            {FILTER_OPTIONS.map((filter: FilterOption) => {
              const isActive = activeCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveCategory(filter.key)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer",
                    isActive
                      ? "text-white bg-white/10 border border-white/20 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
                  )}
                >
                  {t(filter.labelKey)}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className="absolute inset-0 rounded-full border border-purple-500/50 bg-purple-500/10 pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
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
                  className="group relative bg-slate-950 hover:bg-slate-900/90 transition-colors duration-300 p-8 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-zinc-500 tracking-wider group-hover:text-purple-400 transition-colors">
                          {service.code}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-widest font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                          {service.tag}
                        </span>
                      </div>

                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/[0.05] transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {IconComponent && (
                          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-purple-400 group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-300 shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-white tracking-tight leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-semibold block">
                        {t("deliverables_label")}
                      </span>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliverable: string, deliverableIndex: number) => (
                          <li
                            key={deliverableIndex}
                            className="text-xs text-zinc-300 flex items-start gap-2 leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400/80 shrink-0 mt-0.5" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.06] mt-6 flex flex-wrap gap-1.5">
                    {service.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wide text-zinc-400 bg-white/[0.03] border border-white/[0.06] group-hover:border-white/10 group-hover:text-zinc-300 transition-colors"
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

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-semibold text-white tracking-tight">
              {t("cta_title")}
            </h4>
            <p className="text-sm text-zinc-400">
              {t("cta_description")}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-zinc-200 text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl shrink-0 cursor-pointer"
          >
            <span>{t("cta_button")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

