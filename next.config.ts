import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    domains: ["media.licdn.com", "play-lh.googleusercontent.com"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
