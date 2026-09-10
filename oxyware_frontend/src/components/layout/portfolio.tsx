"use client";

import { useRef } from "react";
import type { JSX } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectDetails {
  title: string;
  category: string;
  description: string;
  tags: string[];
}

interface PortfolioProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

interface ProjectArticleProps {
  project: PortfolioProjectItem;
  index: number;
  requestText: string;
}

function ProjectArticle({ project, index, requestText }: ProjectArticleProps): JSX.Element {
  const articleRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end start"],
  });

  const previewY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <article
      ref={articleRef}
      className={cn(
        "py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center",
        index % 2 !== 0 && "lg:flex-row-reverse"
      )}
    >
      <motion.div
        style={{ y: textY }}
        className={cn(
          "lg:col-span-5 flex flex-col justify-between h-full",
          index % 2 !== 0 ? "lg:order-2" : "lg:order-1"
        )}
      >
        <div>
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-purple-500/20 mb-8">
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
              {`PROJETO // ${project.index}`}
            </span>
            <span className="text-xs font-mono tracking-wider text-blue-300 uppercase">
              {project.category}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 uppercase">
            {project.title}
          </h3>

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-md border border-purple-500/30 px-3 py-1 text-[11px] font-mono tracking-wider text-purple-200 uppercase bg-purple-500/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Link
            href={project.link}
            className="rounded-lg border border-purple-500/40 px-6 py-3.5 text-xs font-mono tracking-widest uppercase text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent transition-all duration-300 inline-flex items-center gap-3 w-fit"
          >
            <span>{requestText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        style={{ y: previewY }}
        className={cn(
          "lg:col-span-7",
          index % 2 !== 0 ? "lg:order-1" : "lg:order-2"
        )}
      >
        <div className="rounded-xl border border-purple-500/25 bg-slate-950/80 overflow-hidden group hover:border-purple-500/50 transition-all duration-300 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-slate-950/90 text-[11px] font-mono text-neutral-300 uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-gradient-to-r from-purple-500 to-blue-500" />
              <span className="text-neutral-400">{`SYS://${project.id}`}</span>
            </div>
            <span className="text-purple-300 font-mono text-[10px] tracking-wider font-semibold">
              {"SCROLL PREVIEW ↓"}
            </span>
          </div>

          <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] overflow-y-auto overscroll-contain scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(168,85,247,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-purple-500/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-purple-500/60">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={3600}
              priority={index === 0}
              quality={100}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export default function Portfolio(): JSX.Element {
  const t = useTranslations("portfolio");
  const locale = useLocale();

  const vitrolinhaData = t.raw("projects.vitrolinha") as ProjectDetails | undefined;
  const realEstateData = t.raw("projects.realEstate") as ProjectDetails | undefined;
  const carsData = t.raw("projects.cars") as ProjectDetails | undefined;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const headerY = useTransform(scrollYProgress, [0, 0.4], [10, -10]);

  const projects: PortfolioProjectItem[] = [
    {
      id: "vitrolinha",
      index: "01",
      title: vitrolinhaData?.title || "Portal Oficial Vitrolinha",
      category: vitrolinhaData?.category || "PORTAL POLÍTICO & CAMPANHA DIGITAL",
      description:
        vitrolinhaData?.description ||
        "Website institucional e plataforma de campanha com alta taxa de conversão, divulgação completa de propostas, canal direto via WhatsApp, notícias em tempo real e arquitetura responsiva.",
      tags: vitrolinhaData?.tags || [
        "NEXT.JS",
        "TAILWIND CSS",
        "CAMPANHA DIGITAL",
        "ALTA PERFORMANCE",
        "SEO",
      ],
      image: "/sitevitrolinha.png",
      link: `/${locale}/contact`,
    },
    {
      id: "real-estate",
      index: "02",
      title: realEstateData?.title || "Sistema Imobiliário",
      category: realEstateData?.category || "PLATAFORMA WEB & GESTÃO",
      description:
        realEstateData?.description ||
        "Sistema imobiliário completo com busca avançada de imóveis, filtros refinados, visualização detalhada de propriedades e captura ágil de leads.",
      tags: realEstateData?.tags || [
        "NEXT.JS",
        "TYPESCRIPT",
        "TAILWIND CSS",
        "PAINEL ADMINISTRATIVO",
      ],
      image: "/example/websiteexample.png",
      link: `/${locale}/contact`,
    },
    {
      id: "automotive",
      index: "03",
      title: carsData?.title || "Concessionária de Carros",
      category: carsData?.category || "PORTAL AUTOMOTIVO & SHOWROOM",
      description:
        carsData?.description ||
        "Plataforma digital para concessionária automotiva, incluindo vitrine dinâmica de veículos esportivos, SUVs e sedans, agendamento de test drive e módulos de conversão.",
      tags: carsData?.tags || [
        "REACT",
        "CATÁLOGO DIGITAL",
        "AGENDAMENTOS",
        "ALTA PERFORMANCE",
      ],
      image: "/example/cars.png",
      link: `/${locale}/contact`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      aria-label="Projetos Selecionados"
      className="relative w-full py-28 text-white border-t border-purple-500/20 overflow-hidden"
    >
      <motion.div
        style={{
          y: backgroundY,
          backgroundImage: "url('/bg3.png')",
        }}
        className="absolute -inset-x-0 -top-40 -bottom-40 bg-cover bg-center pointer-events-none -z-20 opacity-35 scale-105"
      />
      <div className="absolute inset-0 bg-slate-950/80 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <motion.div
          style={{ y: headerY }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-purple-500/20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-xs bg-purple-500 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.25em] text-purple-300 uppercase font-semibold">
                {t("tag")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              {t("title")}{" "}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                ™
              </span>
            </h2>
          </div>

          <p className="text-neutral-300 text-base sm:text-lg max-w-md font-light leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        <div className="divide-y divide-purple-500/15">
          {projects.map((project: PortfolioProjectItem, index: number) => (
            <ProjectArticle
              key={project.id}
              project={project}
              index={index}
              requestText={t("requestProject")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
