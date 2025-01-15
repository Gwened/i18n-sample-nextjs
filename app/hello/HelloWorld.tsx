import getLocaleFromHeaders from "@/utils/currentLocale.server";
import Acknowledge from "./Acknowledge";
import getTexts from "@/utils/getTexts";

// This is a React Server Component
export default async function HelloWorld() {
    const texts = await getTexts(await getLocaleFromHeaders());
    return <div>
        <h1>{texts.helloWorld}</h1>
        <Acknowledge />
    </div>
}