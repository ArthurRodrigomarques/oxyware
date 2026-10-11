The hero uses the original animations with H.264 video, no audio, and 30 fps:

- Mobile: 1280 x 720 at 1.1 Mbps.
- Desktop: 1920 x 1080 at 2.5 Mbps.
- WebP posters display while videos load. Visible videos autoplay, muted and inline, on mobile and desktop.
- Data saving and slow connections disable only preloading of the next video. Playback pauses outside the viewport or in a hidden tab and resumes when visible.

The generated files are already included in `public/media/hero/v1`. No encoder is needed to build or deploy the website.

To regenerate them on Windows, use the built-in Windows encoder with Windows PowerShell 5.1, then prepare streaming metadata after the encoder process exits:

```powershell
powershell.exe -NoProfile -File scripts/optimize-hero-media.ps1
node scripts/prepare-hero-streaming.mjs
```

The second step places MP4 metadata before the video data and compresses posters using the Sharp dependency provided by Next.js. The current posters are captures of the videos playing in the browser.

For a future published asset update, use a new version directory and update `src/lib/hero-media.ts` and the cache route in `next.config.ts`, since these URLs have immutable caching.
