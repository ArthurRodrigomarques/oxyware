import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: { qualities: [75, 85] },
  async headers() {
    return [{
      source: "/media/hero/v1/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
