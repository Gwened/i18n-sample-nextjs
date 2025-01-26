// From next-i18n-router
import { i18nConfig, type SupportedLocale } from '@/i18nConfig';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';


function localeDetector(request: Request): SupportedLocale {
  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach((value: string, key: string) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // match can only use specifically formatted locales
  // https://stackoverflow.com/questions/76447732/nextjs-13-i18n-incorrect-locale-information-provided
  try {
    return match(languages, i18nConfig.locales, i18nConfig.defaultLocale) as SupportedLocale;
  } catch (e) {

    return i18nConfig.defaultLocale as SupportedLocale;
  }
}

export default localeDetector;