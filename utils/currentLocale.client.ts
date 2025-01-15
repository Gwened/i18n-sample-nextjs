import { TextsProvider } from "@/app/providers";
import { useContext } from "react";

// This can be only used in Client Components
export default function getLocaleFromContext() {
    return useContext(TextsProvider).locale;
}
