

export const i18nConfig = {
    locales: ["en", "fr"],
    defaultLocale: "en"
} as const;


export type SupportedLocale = typeof i18nConfig.locales[number];