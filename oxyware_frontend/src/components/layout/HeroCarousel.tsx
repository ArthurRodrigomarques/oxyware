"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export interface HeroSlideItem {
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  videoSrc: string;
}

export interface HeroCarouselProps {
  slides?: HeroSlideItem[];
  autoplayIntervalMs?: number;
}

const DEFAULT_SLIDES: HeroSlideItem[] = [
  {
    tag: "INOVAÇÃO & ENGENHARIA",
    titlePrefix: "Construindo o",
    titleHighlight: "Futuro",
    titleSuffix: "™",
    description:
      "Criamos aplicativos e websites modernos que impulsionam seu negócio para a era digital com tecnologia de ponta e design inovador.",
    ctaText: "Solicitar Orçamento",
    ctaHref: "/contact",
    videoSrc: "/abackgroundvideo.mp4",
  },
  {
    tag: "DESENVOLVIMENTO WEB & MOBILE",
    titlePrefix: "Soluções Digitais de",
    titleHighlight: "Alto Impacto",
    titleSuffix: "",
    description:
      "Experiências fluidas e inteligentes para iOS, Android e Web com arquitetura escalável e design moderno.",
    ctaText: "Conhecer Nossos Serviços",
    ctaHref: "#services",
    videoSrc: "/abubbles.mp4",
  },
  {
    tag: "SISTEMAS SOB MEDIDA",
    titlePrefix: "Tecnologia para",
    titleHighlight: "Escalar Resultados",
    titleSuffix: "",
    description:
      "Automação de processos empresariais e plataformas em nuvem de alta performance para impulsionar seu crescimento.",
    ctaText: "Ver Nosso Portfólio",
    ctaHref: "#portfolio",
    videoSrc: "/AbstractRibbons.mp4",
  },
  {
    tag: "INTELIGÊNCIA & DADOS",
    titlePrefix: "Arquitetura Digital de",
    titleHighlight: "Próxima Geração",
    titleSuffix: "",
    description:
      "Infraestrutura escalável, microsserviços modernos e engenharia de software para negócios que buscam liderança de mercado.",
    ctaText: "Falar com Especialistas",
    ctaHref: "/contact",
    videoSrc: "/particle.mp4",
  },
];

const TOTAL_CAROUSEL_SLIDES = 4;

export default function HeroCarousel({
  slides: customSlides,
  autoplayIntervalMs = 7000,
}: HeroCarouselProps) {
  const t = useTranslations("HeroCarousel");
  const locale = useLocale();

  const rawSlides = t.raw("slides") as HeroSlideItem[] | undefined;
  const slideItems: HeroSlideItem[] = (
    customSlides && customSlides.length > 0
      ? customSlides
      : Array.isArray(rawSlides) && rawSlides.length > 0
      ? rawSlides
      : DEFAULT_SLIDES
  ).slice(0, TOTAL_CAROUSEL_SLIDES);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = slideItems[currentIndex] || slideItems[0];
  const totalSlides = slideItems.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const handleSelectSlide = (targetIndex: number) => {
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / autoplayIntervalMs) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          handleNext();
          return 0;
        }
        return prevProgress + progressIncrement;
      });
    }, stepMs);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPaused, autoplayIntervalMs, handleNext]);

  const formatSlideNumber = (index: number): string => {
    return String(index + 1).padStart(2, "0");
  };

  const getResolvedHref = (href: string): string => {
    if (href.startsWith("#")) {
      return href;
    }
    if (href.startsWith("/")) {
      return `/${locale}${href}`;
    }
    return href;
  };

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative w-full min-h-screen bg-[#050608] text-white flex items-center overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.video
            key={currentSlide.videoSrc}
            src={currentSlide.videoSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={(e) => {
              const videoElement = e.currentTarget;
              videoElement.muted = true;
              const playPromise = videoElement.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }}
            className="absolute inset-0 w-full h-full object-cover object-right lg:object-center"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-[#050608]/75 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/40 z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-20 min-h-screen flex flex-col justify-between pt-32 pb-14">
        <div className="my-auto max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                  {currentSlide.tag}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
                {currentSlide.titlePrefix}{" "}
                <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent inline-block">
                  {currentSlide.titleHighlight}
                </span>
                {currentSlide.titleSuffix && (
                  <span className="text-purple-400 font-normal ml-0.5 text-2xl sm:text-4xl align-super">
                    {currentSlide.titleSuffix}
                  </span>
                )}
              </h1>

              <p className="text-neutral-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-8">
                {currentSlide.description}
              </p>

              <div className="flex items-center gap-6">
                <Link
                  href={getResolvedHref(currentSlide.ctaHref)}
                  className="group inline-flex items-center gap-3 text-white font-medium text-lg hover:text-purple-300 transition-colors duration-200"
                >
                  <span className="border-b border-white/30 group-hover:border-purple-300 pb-0.5 transition-all duration-200">
                    {currentSlide.ctaText}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/30 group-hover:border-purple-300 group-hover:bg-purple-500/10 flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white group-hover:text-purple-300" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-white/10 max-w-lg">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t("previousSlide")}
              className="w-11 h-11 rounded-full border border-white/30 hover:border-white hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t("nextSlide")}
              className="w-11 h-11 rounded-full border border-white/30 hover:border-white hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 text-sm font-mono tracking-wider ml-2">
              <span className="text-white font-semibold">
                {formatSlideNumber(currentIndex)}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-500">
                {formatSlideNumber(totalSlides)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1">
            {slideItems.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectSlide(index)}
                aria-label={`${t("slideIndicator")} ${index + 1}`}
                className="relative h-1 flex-1 bg-white/20 rounded-full overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer"
              >
                {index === currentIndex && (
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {index < currentIndex && (
                  <div className="absolute inset-0 bg-white/60 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
