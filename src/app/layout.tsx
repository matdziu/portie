import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Portie",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${raleway.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
