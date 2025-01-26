import { i18nConfig, type SupportedLocale } from "@/i18nConfig";
import { headers } from "next/headers";
// Be careful to the dreaded error:
// "You're importing a component that needs "next/headers". That only works in a Server Component"

export default async function getLocaleFromHeaders(): Promise<SupportedLocale> {
    // New in Next.js 15 : headers() is async
    return ((await headers()).get("Content-Language") ?? i18nConfig.defaultLocale) as SupportedLocale;
}