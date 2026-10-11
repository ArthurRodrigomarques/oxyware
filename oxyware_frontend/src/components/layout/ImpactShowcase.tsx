"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface ImpactMetricItem {
  id: string;
  value: string;
  headline: string;
  subline: string;
}

const DEFAULT_METRICS: ImpactMetricItem[] = [
  {
    id: "deploy",
    value: "12x",
    headline: "Aceleração no Ciclo de Deploy & Entrega Contínua",
    subline: "para Plataformas Digitais & E-commerce de Alta Demanda",
  },
  {
    id: "uptime",
    value: "99.9%",
    headline: "Uptime e Resiliência de Infraestrutura em Nuvem",
    subline: "em Microsserviços e APIs de Missão Crítica",
  },
  {
    id: "leads",
    value: "+340%",
    headline: "Crescimento em Conversão e Geração de Leads",
    subline: "para Portais Imobiliários & Showrooms Digitais",
  },
  {
    id: "concurrency",
    value: "50K+",
    headline: "Requisições Simultâneas Suportadas por Minuto",
    subline: "com Zero Gargalos de Conexão ou Perda de Sessão",
  },
  {
    id: "automation",
    value: "-60%",
    headline: "Redução no Tempo Operacional de Tarefas Manuais",
    subline: "através de Automação de Sistemas Sob Medida & ERP",
  },
  {
    id: "mobile",
    value: "4.9★",
    headline: "Satisfação Média de Usuários em Lojas de Apps",
    subline: "em Experiências Nativas para iOS e Android",
  },
];

export default function ImpactShowcase(): React.JSX.Element {
  const t = useTranslations("impact_showcase");
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState<number>(0);

  const rawMetrics: unknown = t.raw("metrics");
  const metrics: ImpactMetricItem[] =
    Array.isArray(rawMetrics) && rawMetrics.length > 0
      ? (rawMetrics as ImpactMetricItem[])
      : DEFAULT_METRICS;

  useEffect(() => {
    const calculateScrollRange = (): void => {
      if (trackRef.current) {
        const totalTrackWidth: number = trackRef.current.scrollWidth;
        const viewportWidth: number = window.innerWidth;
        const rightBuffer: number = 140;
        setScrollRange(Math.max(0, totalTrackWidth - viewportWidth + rightBuffer));
      }
    };

    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);

    const observer = new ResizeObserver((): void => {
      calculateScrollRange();
    });

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener("resize", calculateScrollRange);
      observer.disconnect();
    };
  }, [metrics]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [0, -scrollRange, -scrollRange]
  );

  const numbersParallaxY: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -25]
  );

  const backgroundY: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [-48, 48]
  );

  const detailY: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [32, -32]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh] bg-slate-950 text-white select-none"
      id="impact"
    >
      <div className="sticky top-0 h-dvh w-full flex flex-col justify-center overflow-hidden bg-slate-950 pt-24 pb-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: backgroundY }}
            className="absolute -inset-y-16 inset-x-0 opacity-90 motion-reduce:!transform-none"
          >
            <Image
              src="/bg3.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-left"
            />
          </motion.div>
          <motion.div
            style={{ y: detailY, maskImage: "linear-gradient(to right, transparent, black 65%)" }}
            className="absolute -inset-y-16 inset-x-0 opacity-80 motion-reduce:!transform-none"
          >
            <Image
              src="/bgquote2.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/60" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t("title_part1")}{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              {t("title_part2")}
            </span>
          </h2>
        </div>

        <div className="w-full overflow-hidden relative z-10">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-start gap-16 sm:gap-20 lg:gap-28 pl-6 sm:pl-10 lg:pl-16 pr-32 w-max"
          >
            {metrics.map((metric: ImpactMetricItem) => (
              <div
                key={metric.id}
                className="flex flex-col w-[280px] sm:w-[340px] lg:w-[420px] shrink-0 group"
              >
                <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 mb-6 sm:mb-8" />

                <motion.span
                  style={{ y: numbersParallaxY }}
                  className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent leading-none mb-4 font-sans select-none"
                >
                  {metric.value}
                </motion.span>

                <h3 className="text-lg sm:text-xl font-medium text-white leading-snug mb-2 group-hover:text-purple-200 transition-colors duration-200">
                  {metric.headline}
                </h3>

                <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
                  {metric.subline}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
