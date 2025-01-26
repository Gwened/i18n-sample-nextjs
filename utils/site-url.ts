import { i18nConfig, type SupportedLocale } from "@/i18nConfig";
import { getLocaleInURLPrefix } from "./i18nMiddleware";


export function makePrefixedLocalePathnames(pathname: string): {[lg in SupportedLocale]: string} {
    const existingLocaleInURL = getLocaleInURLPrefix(pathname, i18nConfig.locales);
    
    let res: {[lg in SupportedLocale]: string} = {} as any;
    for (const locale of i18nConfig.locales) {
      if (existingLocaleInURL !== null) {
        res[locale] = pathname.replace(`/${existingLocaleInURL}`, `/${locale}`);
      } else {
        res[locale] = `/${locale}${pathname}`;
      }
    }
    return res;
}

export default function makeSiteUrl(pathname: string) {
    // Add your own  environment variables here
    return `http://localhost:${process.env.PORT || 3000}${pathname}`;
}
  