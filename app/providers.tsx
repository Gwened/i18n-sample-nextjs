"use client"

import type { SupportedLocale } from "@/i18nConfig";
import type { Texts } from "@/texts/en";
import { createContext } from "react";

export const TextsProvider = createContext<{locale: SupportedLocale, texts: Texts}>({locale: "en", texts: {} as Texts});

export default function Providers({locale, texts, children}: {
        texts: Texts,
        locale: SupportedLocale,
        children: React.ReactNode
    }) {
    return <TextsProvider.Provider value={{ locale, texts }}>
        {children}
    </TextsProvider.Provider>
}