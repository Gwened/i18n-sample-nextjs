import { i18nConfig, type SupportedLocale } from "@/i18nConfig";
import { NextRequest, NextResponse } from "next/server";
import localeDetector from "./localeDetector";
import { addToHeader } from "@/middleware";

export function getLocaleInURLPrefix(pathname: string, locales: readonly SupportedLocale[]): SupportedLocale|null {
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}`)) {
        if (pathname.length === 3 || pathname[3] === '/')
          return locale;
      }
    }
    return null;
} 

export default function i18nMiddleware(request: NextRequest, response: NextResponse) {
    const { defaultLocale, locales } = i18nConfig;
  
    // Is the locale in the URL prefix?
    let locale = getLocaleInURLPrefix(request.nextUrl.pathname, locales) as string|null;
    let isLocaleInURL = false;
  
    if (locale !== null) {
        // Map to our app folder structure
        const newPathPrefix = (request.nextUrl.pathname.length === 3) ? "/" : "";
        response = NextResponse.rewrite(new URL(request.nextUrl.pathname.replace(`/${locale}`, newPathPrefix), request.url), response);
        isLocaleInURL = true;
    } else {
        // Here: we could also get a value from the cookies, in order to let the user set their preference
        // independently from the preferences set in the browser settings
        // const cookieValue = request.cookies.get(localeCookieName)?.value;
        // if (cookieValue && locales.includes(cookieValue as SupportedLocale)) {
        //     locale = cookieValue;
        // }
        // Is the locale in the Accept-Language header?
        if (!locale) {
          locale = localeDetector(request);
        }
        //console.log("Locale: ", locale);
        if (!locales.includes(locale as SupportedLocale)) {
          console.warn(
              'The localeDetector callback must return a locale included in your locales array. Reverting to using defaultLocale.'
          );
          locale = defaultLocale;
        }
    }
    response.headers.set('Content-Language', locale!);
    if (!isLocaleInURL)
      addToHeader(response, 'Vary', 'Content-Language');
    return response;
  }