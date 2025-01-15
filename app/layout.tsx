import "./globals.css";
import getTexts from "@/utils/getTexts";
import Providers from "./providers";
import makeSiteUrl, { makePrefixedLocalePathnames } from "@/utils/site-url";
//import getLocaleFromHeaders from "@/utils/currentLocale.server";
import { i18nConfig, SupportedLocale } from "@/i18nConfig";
import getLocaleFromHeaders from "@/utils/currentLocale.server";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export async function generateMetadata(_: any, state: any) {
  // Hack from https://github.com/vercel/next.js/discussions/50189 to get the pathname.
  // Warning: doesn't seem to work with static generation
  const pathname = (Object.getOwnPropertySymbols(state) 
    .map((item) => state[item])
    .find((state) => state?.hasOwnProperty("url"))?.url?.pathname)
    ?? "";

  const altPathnames = makePrefixedLocalePathnames(pathname);
  const locale = await getLocaleFromHeaders();

  return {
    title: "i18n Sample",
    alternates: {
      canonical: makeSiteUrl(altPathnames[locale]).replace(`/${locale}`, ""),
      languages: // generates <link rel="alternate" hreflang="{locale}" href="http://localhost:3000/{locale}/hello">
        Object.fromEntries(
          i18nConfig.locales.map(locale => [locale, makeSiteUrl(altPathnames[locale])])
        ) as Record<SupportedLocale, string>,
    },
    other: {
      "og:locale:alternate": i18nConfig.locales
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromHeaders();
  const texts = await getTexts(locale);

  return (
    <html lang={locale}>
      <body>
        <Providers {...{ locale, texts }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
