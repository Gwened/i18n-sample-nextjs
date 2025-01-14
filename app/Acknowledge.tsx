"use client"

import { useState } from "react"

export default function Acknowledge() {
    const [acknowledged, setAcknowledged] = useState(false)
    return <div>
        {acknowledged
            ? <p>Thank you for acknowledging</p>
            : <button onClick={() => setAcknowledged(true)}>Acknowledge</button>
        }
    </div>
}