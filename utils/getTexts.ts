import { SupportedLocale } from "@/i18nConfig";
import type { Texts } from "@/texts/en";

export default async function getTexts(locale: SupportedLocale): Promise<Texts> {
    return (await import(`@/texts/${locale}`)).default;
}
