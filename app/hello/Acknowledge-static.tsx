"use client"

import getTexts from "@/utils/getTexts";
import { use, useState } from "react"

// This is a React Client Component
export default function Acknowledge() {
    const texts = use(getTexts(
        // Note: to get the locale from the URL, but keep the page staticly generated, add a folder in the route
        // and get the parameter. Using a header such as "next-url" would make the page dynamic
        "en"
    ));
    const [acknowledged, setAcknowledged] = useState(false);
    return <div>
        {acknowledged
            ? <p>{texts.thankYou}</p>
            : <button onClick={() => setAcknowledged(true)}>{texts.acknowledge}</button>
        }
    </div>
}