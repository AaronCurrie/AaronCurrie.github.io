import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <img src="/tacticalMap.png" className={styles.map} />
      <div className={styles.overlay}>
        <h1>
          Hola
        </h1>
      </div>
    </main>
  );
}
