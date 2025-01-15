import type { SupportedLocale } from "@/i18nConfig";
import Acknowledge from "./Acknowledge";
import getTexts from "@/utils/getTexts";

// This is a React Server Component
export default async function HelloWorld({locale}: {locale: SupportedLocale}) {
    const texts = await getTexts(locale);
    
    return <div>
        <h1>{texts.helloWorld}</h1>
        <Acknowledge {...{locale, texts}} />
    </div>
}