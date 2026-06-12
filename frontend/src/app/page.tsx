import styles from "./page.module.scss";
import { Button } from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.card}>
          <div>
            <h2 className={styles.title}>Quiz Creator</h2>
            <p className={styles.description}>
              Create a brand new quiz with custom questions, checkboxes, and
              text inputs.
            </p>
          </div>
          <Button href="/create" className={styles.buttonCreate}>
            Create a new Quiz
          </Button>
        </section>

        <section className={styles.card}>
          <div>
            <h2 className={styles.title}>Available Quizzes</h2>
            <p className={styles.description}>
              Browse our collection of existing quizzes and test your knowledge
              right now.
            </p>
          </div>
          <Button href="/quizzes" className={styles.button}>
            See all quizzes
          </Button>
        </section>
      </main>
    </div>
  );
}