import styles from "@/app/page.module.css";
import HelloWorld from "./HelloWorld";
import getLocaleFromParams from "@/utils/currentLocale";

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  return <div className={styles.page}>
    <HelloWorld locale={getLocaleFromParams(await params)} />
  </div>
}
