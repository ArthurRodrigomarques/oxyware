"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { SyntheticEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveHeroMedia } from "@/lib/hero-media";
import { useHeroPlayback } from "@/hooks/use-hero-playback";

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
    videoSrc: "/quarto.mp4",
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
    videoSrc: "/segundo.mp4",
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
    videoSrc: "/terceiro.mp4",
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
    videoSrc: "/abackgroundvideo.mp4",
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
  const [slideCycle, setSlideCycle] = useState<number>(0);
  const [readyToken, setReadyToken] = useState<string | null>(null);
  const [bufferedToken, setBufferedToken] = useState<string | null>(null);
  const [fallbackToken, setFallbackToken] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentSlide = slideItems[currentIndex] || slideItems[0];
  const totalSlides = slideItems.length;
  const currentMedia = resolveHeroMedia(currentSlide.videoSrc);
  const nextMedia = resolveHeroMedia(slideItems[(currentIndex + 1) % totalSlides].videoSrc);
  const playbackToken = `${currentSlide.videoSrc}:${slideCycle}`;
  const isVideoReady = readyToken === playbackToken;
  const { canPreloadNextVideo, isVisible, isPageVisible } = useHeroPlayback({
    sectionRef,
    videoRef,
    videoSrc: playbackToken,
  });
  const isCarouselRunning = !isPaused && isVisible && isPageVisible &&
    (isVideoReady || fallbackToken === playbackToken);

  useEffect(() => {
    const video = videoRef.current;
    // Autoplay may start before hydration attaches the React playing listener.
    if (video && !video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setReadyToken(playbackToken);
    }
  }, [playbackToken]);

  useEffect(() => {
    if (isVideoReady || !isVisible || !isPageVisible) return;
    // Keep text navigation available when the browser blocks autoplay or the connection stalls.
    const timeout = window.setTimeout((): void => setFallbackToken(playbackToken), 4000);
    return () => window.clearTimeout(timeout);
  }, [playbackToken, isVideoReady, isVisible, isPageVisible]);

  const handleNext = useCallback((): void => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setSlideCycle((previous) => previous + 1);
  }, [totalSlides]);

  const handlePrev = useCallback((): void => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    setSlideCycle((previous) => previous + 1);
  }, [totalSlides]);

  const handleSelectSlide = (targetIndex: number): void => {
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
    setSlideCycle((previous) => previous + 1);
  };

  const handleVideoProgress = (event: SyntheticEvent<HTMLVideoElement>): void => {
    const video = event.currentTarget;
    if (!Number.isFinite(video.duration)) return;
    const bufferTarget = Math.min(video.duration, video.currentTime + autoplayIntervalMs / 1000 + 2);
    for (let index = 0; index < video.buffered.length; index++) {
      if (video.buffered.start(index) <= video.currentTime && video.buffered.end(index) >= bufferTarget) {
        setBufferedToken(playbackToken);
        return;
      }
    }
  };

  const formatSlideIndex = (index: number): string => {
    return String(index + 1).padStart(2, "0");
  };

  const formatTotalCount = (count: number): string => {
    return String(count).padStart(2, "0");
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
      ref={sectionRef}
      id="hero"
      aria-label="Hero Showcase"
      className="relative w-full min-h-screen bg-[#050608] text-white flex items-center overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {currentMedia.posterSrc && (
          <Image
            key={currentMedia.posterSrc}
            src={currentMedia.posterSrc}
            alt=""
            fill
            sizes="100vw"
            priority={currentIndex === 0}
            quality={85}
            className="object-cover object-center contrast-[1.04] saturate-[1.12]"
          />
        )}
        <video
          ref={videoRef}
          key={playbackToken}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          onPlaying={(): void => setReadyToken(playbackToken)}
          onProgress={handleVideoProgress}
          onLoadedData={handleVideoProgress}
          onError={(): void => setFallbackToken(playbackToken)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 contrast-[1.04] saturate-[1.12]",
            isVideoReady ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={currentMedia.mobileSrc} media="(max-width: 767px)" type="video/mp4" />
          <source src={currentMedia.desktopSrc} type="video/mp4" />
        </video>
        {totalSlides > 1 && canPreloadNextVideo && isVisible && isPageVisible &&
          isVideoReady && bufferedToken === playbackToken && (
          <video key={nextMedia.mobileSrc} hidden aria-hidden="true" muted playsInline preload="auto">
            <source src={nextMedia.mobileSrc} media="(max-width: 767px)" type="video/mp4" />
            <source src={nextMedia.desktopSrc} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/85 via-[#050608]/20 to-transparent lg:bg-gradient-to-r lg:from-[#050608]/80 lg:via-[#050608]/15 lg:to-transparent z-10 pointer-events-none" />
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
                <span className="w-2 h-2 rounded-none bg-purple-500 animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                  {currentSlide.tag}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 font-orbitron">
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
                  <div className="w-8 h-8 rounded-none border border-white/30 group-hover:border-purple-300 group-hover:bg-purple-500/10 flex items-center justify-center transition-all duration-200">
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
              className="w-11 h-11 rounded-none border border-white/30 hover:border-white hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t("nextSlide")}
              className="w-11 h-11 rounded-none border border-white/30 hover:border-white hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 text-sm font-mono tracking-wider ml-2">
              <span className="text-white font-semibold">
                {formatSlideIndex(currentIndex)}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-500">
                {formatTotalCount(totalSlides)}
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
                className="relative h-1 flex-1 bg-white/20 rounded-none overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer"
              >
                {index === currentIndex && (
                  <div
                    key={slideCycle}
                    className="absolute inset-0 origin-left bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 rounded-none"
                    onAnimationEnd={handleNext}
                    style={{
                      animation: `hero-carousel-progress ${Math.max(1000, autoplayIntervalMs)}ms linear forwards`,
                      animationPlayState: isCarouselRunning ? "running" : "paused",
                    }}
                  />
                )}
                {index < currentIndex && (
                  <div className="absolute inset-0 bg-white/60 rounded-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
