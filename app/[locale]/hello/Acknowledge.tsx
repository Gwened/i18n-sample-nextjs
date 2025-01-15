"use client"

import { SupportedLocale } from "@/i18nConfig";
import { Texts } from "@/texts/en";
import getTexts from "@/utils/getTexts";
import { /*useContext,*/ Suspense, use, useState } from "react"
//import { TextsProvider } from "@/app/providers";

// This is a React Client Component
export default function Acknowledge({locale, texts}: {locale: SupportedLocale, texts: Texts}) {
    //const { texts } = useContext(TextsProvider); // not possible (see layout.tsx), we have to pass them in props
    const [acknowledged, setAcknowledged] = useState(false);
    return <div>
        {acknowledged
            ? <p>{texts.thankYou}</p>
            : <button onClick={() => setAcknowledged(true)}>{texts.acknowledge}</button>
        }
    </div>
}