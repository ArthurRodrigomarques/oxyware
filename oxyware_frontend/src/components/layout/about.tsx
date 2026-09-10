"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Sparkles } from "lucide-react";
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

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden" id="about">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono tracking-widest text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{t("badge")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                {t("transform_ideas")}{" "}
                <span className="text-white block sm:inline">
                  {t("digital_reality")}
                </span>
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                {t("oxyware_description")}
              </p>
            </div>

            <div className="border-t border-white/10 divide-y divide-white/10">
              {aboutItems.map((item: AboutItem) => (
                <div key={item.code} className="py-4 flex items-start gap-4 group">
                  <span className="font-mono text-xs font-semibold text-zinc-500 pt-0.5 group-hover:text-purple-400 transition-colors">
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
                  "inline-flex items-center gap-3 px-7 py-3.5 rounded-xl",
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

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-px">
              {stats.map((stat: StatItem) => (
                <article
                  key={stat.code}
                  className="group relative bg-slate-950 hover:bg-slate-900/90 transition-colors duration-300 p-8 flex flex-col justify-between min-h-[220px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {stat.code} · {stat.tag}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                  </div>

                  <div className="my-6">
                    <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-white group-hover:text-white transition-colors">
                      {stat.number}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-200 tracking-tight">
                      {stat.label}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {stat.sublabel}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

