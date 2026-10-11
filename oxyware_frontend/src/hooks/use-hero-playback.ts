"use client";

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface NetworkInformation extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

interface HeroPlaybackOptions {
  sectionRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSrc: string;
}

interface HeroPlaybackState {
  canPreloadNextVideo: boolean;
  isVisible: boolean;
  isPageVisible: boolean;
}

export function useHeroPlayback({ sectionRef, videoRef, videoSrc }: HeroPlaybackOptions): HeroPlaybackState {
  const [canPreloadNextVideo, setCanPreloadNextVideo] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPageVisible, setIsPageVisible] = useState<boolean>(true);

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    const updatePolicy = (): void => {
      // Connection settings limit only speculative downloads, never the visible video.
      setCanPreloadNextVideo(!connection?.saveData &&
        connection?.effectiveType !== 'slow-2g' && connection?.effectiveType !== '2g' &&
        connection?.effectiveType !== '3g' &&
        (connection?.downlink === undefined || connection.downlink >= 2.5));
    };
    updatePolicy();
    connection?.addEventListener('change', updatePolicy);
    return () => {
      connection?.removeEventListener('change', updatePolicy);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]): void => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(section);
    const updateVisibility = (): void => setIsPageVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [sectionRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let isActive = true;
    const play = (): void => {
      if (isActive && isVisible && isPageVisible && video.paused) {
        video.muted = true;
        video.defaultMuted = true;
        video.play().catch((): void => { /* Keep the poster visible when autoplay is unavailable. */ });
      }
    };
    video.addEventListener('loadeddata', play);
    video.addEventListener('canplay', play);
    if (isVisible && isPageVisible) play();
    else video.pause();
    window.addEventListener('pointerdown', play, { passive: true });
    window.addEventListener('touchstart', play, { passive: true });
    return () => {
      isActive = false;
      video.removeEventListener('loadeddata', play);
      video.removeEventListener('canplay', play);
      window.removeEventListener('pointerdown', play);
      window.removeEventListener('touchstart', play);
      video.pause();
    };
  }, [videoRef, videoSrc, isVisible, isPageVisible]);

  return { canPreloadNextVideo, isVisible, isPageVisible };
}
