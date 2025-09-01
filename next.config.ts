import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    domains: process.env.NEXT_PUBLIC_SUPABASE_DOMAIN
      ? [process.env.NEXT_PUBLIC_SUPABASE_DOMAIN]
      : [],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
