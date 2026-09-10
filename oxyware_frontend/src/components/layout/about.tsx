"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface AboutItem {
  readonly code: string;
  readonly title: string;
  readonly description: string;
}

interface StatItem {
  readonly code: string;
  readonly tag: string;
  readonly number: string;
  readonly label: string;
  readonly sublabel: string;
}

export default function About() {
  const t = useTranslations("about_section");

  const aboutItems = t.raw("aboutItems") as readonly AboutItem[];
  const stats = t.raw("stats") as readonly StatItem[];

  const [currentStatIndex, setCurrentStatIndex] = useState<number>(0);
  const [statDirection, setStatDirection] = useState<number>(1);
  const [isStatPaused, setIsStatPaused] = useState<boolean>(false);

  const totalStats = stats.length;
  const activeStat = stats[currentStatIndex] || stats[0];

  const handleNextStat = useCallback((): void => {
    setStatDirection(1);
    setCurrentStatIndex((prevIndex) => (prevIndex + 1) % totalStats);
  }, [totalStats]);

  const handlePrevStat = useCallback((): void => {
    setStatDirection(-1);
    setCurrentStatIndex((prevIndex) => (prevIndex - 1 + totalStats) % totalStats);
  }, [totalStats]);

  const handleSelectStat = (index: number): void => {
    setStatDirection(index > currentStatIndex ? 1 : -1);
    setCurrentStatIndex(index);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const swipeThreshold = 40;
    if (info.offset.x > swipeThreshold) {
      handlePrevStat();
    } else if (info.offset.x < -swipeThreshold) {
      handleNextStat();
    }
  };

  useEffect(() => {
    if (isStatPaused || totalStats <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      handleNextStat();
    }, 5500);

    return () => {
      clearInterval(intervalId);
    };
  }, [isStatPaused, totalStats, handleNextStat]);

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden" id="about">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-3.5 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-purple-500/30 bg-purple-950/30 backdrop-blur-md text-xs font-mono tracking-widest text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{t("badge")}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                {t("transform_ideas")}{" "}
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent block mt-1 sm:mt-1.5">
                  {t("digital_reality")}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
                {t("oxyware_description")}
              </p>
            </div>

            <div className="border-t border-white/10 divide-y divide-white/10">
              {aboutItems.map((item: AboutItem) => (
                <div key={item.code} className="py-3.5 sm:py-4 flex items-start gap-3.5 sm:gap-4 group">
                  <span className="font-mono text-xs font-semibold text-purple-400/80 pt-0.5 group-hover:text-purple-300 transition-colors">
                    {item.code}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className={cn(
                  "w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-none",
                  "bg-white text-slate-950 hover:bg-zinc-200",
                  "text-sm font-semibold tracking-wide transition-all duration-200",
                  "shadow-xl group cursor-pointer"
                )}
              >
                <span>{t("button")}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          <div
            className="lg:col-span-6 flex flex-col gap-4"
            onMouseEnter={(): void => setIsStatPaused(true)}
            onMouseLeave={(): void => setIsStatPaused(false)}
            onTouchStart={(): void => setIsStatPaused(true)}
            onTouchEnd={(): void => setIsStatPaused(false)}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-widest text-purple-400 font-semibold uppercase">
                  MÉTRICAS //
                </span>
                <span className="text-xs font-mono tracking-wider text-zinc-400">
                  {String(currentStatIndex + 1).padStart(2, "0")} / {String(totalStats).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevStat}
                  aria-label="Métrica anterior"
                  className="w-9 h-9 rounded-none border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/30 active:scale-95 flex items-center justify-center text-white cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextStat}
                  aria-label="Próxima métrica"
                  className="w-9 h-9 rounded-none border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/30 active:scale-95 flex items-center justify-center text-white cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden min-h-[260px] sm:min-h-[290px]">
              <AnimatePresence mode="wait" custom={statDirection}>
                <motion.article
                  key={activeStat.code}
                  custom={statDirection}
                  initial={{ opacity: 0, x: statDirection * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -statDirection * 30 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="relative bg-slate-950/90 border border-white/10 rounded-none p-6 sm:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[290px] shadow-2xl cursor-grab active:cursor-grabbing"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/5 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-semibold">
                      {activeStat.code} · {activeStat.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase">ATIVO</span>
                      <div className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="relative z-10 my-4 sm:my-6">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold font-mono tracking-tight text-white">
                      {activeStat.number}
                    </div>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <h4 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                      {activeStat.label}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {activeStat.sublabel}
                    </p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {stats.map((stat: StatItem, index: number) => {
                const isSelected = index === currentStatIndex;
                return (
                  <button
                    key={stat.code}
                    type="button"
                    onClick={(): void => handleSelectStat(index)}
                    className={cn(
                      "p-3 text-left border rounded-none transition-all duration-200 cursor-pointer flex flex-col justify-between",
                      isSelected
                        ? "border-purple-500 bg-purple-950/30 text-white shadow-md shadow-purple-950/20"
                        : "border-white/10 bg-slate-950/50 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-purple-400">
                        {stat.code}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-none bg-purple-400" />
                      )}
                    </div>
                    <div className="text-xs font-semibold truncate text-zinc-200 mt-1">
                      {stat.tag}
                    </div>
                    <div className="text-sm font-mono font-bold text-white mt-0.5">
                      {stat.number}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

