export interface HeroMedia {
  desktopSrc: string;
  mobileSrc: string;
  posterSrc?: string;
}

const ORIGINAL_VIDEO_SOURCES: readonly string[] = [
  '/abackgroundvideo.mp4',
  '/segundo.mp4',
  '/terceiro.mp4',
  '/quarto.mp4',
];

export function resolveHeroMedia(videoSrc: string): HeroMedia {
  const index = ORIGINAL_VIDEO_SOURCES.indexOf(videoSrc);
  if (index === -1) return { desktopSrc: videoSrc, mobileSrc: videoSrc };
  const prefix = `/media/hero/v1/${String(index + 1).padStart(2, '0')}`;
  return {
    desktopSrc: `${prefix}-desktop.mp4`,
    mobileSrc: `${prefix}-mobile.mp4`,
    posterSrc: `${prefix}-poster.webp`,
  };
}
