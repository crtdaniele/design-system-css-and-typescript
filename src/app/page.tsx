import styles from "./page.module.css";
import Button from "../design-system/components/Button";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button fontSize="--font-size-xs" color="--color-primary">This is a Button</Button>
      </main>
      <footer className={styles.footer}>
        AAA
      </footer>
    </div>
  );
}