import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    domains: [],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
