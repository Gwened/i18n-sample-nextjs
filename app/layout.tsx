import "./globals.css";
import getTexts from "@/utils/getTexts";
import Providers from "./providers";
import { i18nConfig, SupportedLocale } from "@/i18nConfig";
import getLocaleFromParams from "@/utils/currentLocale";

export async function generateMetadata() {
  return {
    title: "i18n Sample",
    alternates: {
      // Note: here, alternate URLs are wrong, because they only points to the root URL, not the current one.
      // There are hacks to get the pathname, but it seems it requires the pages to be dynamic
      // See https://github.com/vercel/next.js/discussions/50189
      languages: Object.fromEntries(
        i18nConfig.locales.map(locale => [locale, `/${locale}`])
      ) as Record<SupportedLocale, string>,
    }
  };
}

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{locale: string}> // note: locale is not passed here!! See https://github.com/vercel/next.js/discussions/49507
}>) {
  //const locale = getLocaleFromParams(await params); // not possible!
  //const texts = await getTexts(locale);

  return (
    <html /*lang={locale}*/>
      <body>
        {/*<Providers {...{ locale, texts }}>*/}
          {children}
        {/*</Providers>*/}
      </body>
    </html>
  );
}
