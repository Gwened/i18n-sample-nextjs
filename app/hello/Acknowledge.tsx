"use client"

import { useContext, useState } from "react"
import { TextsProvider } from "../providers";

// This is a React Client Component
export default function Acknowledge() {
    const { texts } = useContext(TextsProvider);
    const [acknowledged, setAcknowledged] = useState(false);
    return <div>
        {acknowledged
            ? <p>{texts.thankYou}</p>
            : <button onClick={() => setAcknowledged(true)}>{texts.acknowledge}</button>
        }
    </div>
}