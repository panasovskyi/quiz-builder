import { useState } from "react";
import { QuizShort } from "@/types/quiz";
import { quizService } from "@/api/quiz";
import { KeyedMutator } from "swr";

export const useQuizDelete = (
  quizzes: QuizShort[] | undefined,
  mutate: KeyedMutator<QuizShort[]>,
) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!quizzes) return;

    setDeletingId(id);
    setDeleteError("");

    try {
      await mutate(
        quizzes.filter((q) => q.id !== id),
        { revalidate: false },
      );
      await quizService.deleteQuiz(id);
      mutate();
    } catch {
      mutate();
      setDeleteError(
        "Could not delete the quiz. Please check your connection and try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return { deletingId, deleteError, setDeleteError, handleDelete };
};
