import Acknowledge from "./Acknowledge-static";
import getTexts from "@/utils/getTexts";

// This is a React Server Component
export default async function HelloWorld() {
    const texts = await getTexts(
        // Note: to get the locale from the URL, but keep the page staticly generated, add a folder in the route
        // and get the parameter. Using a header such as "next-url" would make the page dynamic
        "en"
    );   
    
    return <div>
        <h1>{texts.helloWorld}</h1>
        <Acknowledge />
    </div>
}