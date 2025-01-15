import styles from "@/app/page.module.css";
import HelloWorld from "./HelloWorld";

export default function Home() {
  return <div className={styles.page}>
    <HelloWorld />
  </div>
}
