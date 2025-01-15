import { i18nConfig, SupportedLocale } from "@/i18nConfig";

export default function getLocaleFromParams(params: {locale: string}): SupportedLocale {
    return i18nConfig.locales.includes(params.locale as SupportedLocale)
        ? params.locale as SupportedLocale
        : "en"
}