"use client";

import styles from "./page.module.scss";
import useSWR from "swr";
import { quizService } from "@/api/quiz";
import { Spinner } from "@/components/Spinner/Spinner";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useQuizDelete } from "./useQuizdelete";
import { ErrorBlock } from "@/components/ErrorBlock/ErrorBlock";
import { QuizCard } from "./components/QuizCard/QuizCard";
import { EmptyBlock } from '@/components/EmptyBlock/EmptyBlock';

export default function QuizzesPage() {
  const {
    data: quizzes,
    isLoading,
    error,
    mutate,
  } = useSWR("quizzes", quizService.getAllQuizzes);
  const { deletingId, deleteError, setDeleteError, handleDelete } =
    useQuizDelete(quizzes, mutate);

  return (
    <div className={styles.page}>
      <PageHeader title="Available Quizzes" link="/" />

      {deleteError && (
        <ErrorBlock message={deleteError} onClose={() => setDeleteError("")} />
      )}

      {isLoading && (
        <div className={styles.centerContainer}>
          <Spinner />
        </div>
      )}

      {error && (
        <ErrorBlock
          message="Oops! Something went wrong while fetching quizzes."
          onRetry={() => mutate()}
        />
      )}

      {!isLoading && !error && quizzes && quizzes.length === 0 && (
        <EmptyBlock
          message="No quizzes found. Be the first to create one!"
          link="/create"
          linkText="Create a quiz"
        />
      )}

      {!isLoading && quizzes && quizzes.length > 0 && (
        <ul className={styles.list}>
          {quizzes.map((q) => (
            <QuizCard
              key={q.id}
              quiz={q}
              isDeleting={deletingId === q.id}
              isAnyDeleting={deletingId !== null}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
