import { useState } from "react";
import { QuestionType } from "@/types/quiz";
import { FormErrors, QuestionDraft } from "./types";
import {
  createNewOption,
  createNewQuestion,
  DEFAULT_QUESTION_ERROR,
} from "./utils";
import { quizService } from "@/api/quiz";

export const useQuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    createNewQuestion(),
  ]);
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    questions: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createNewQuestion()]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => {
      const updated = { ...prev.questions };
      delete updated[index];
      return { ...prev, questions: updated };
    });
  };

  const updateQuestionText = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, text: value } : q)),
    );
  };

  const updateQuestionType = (index: number, type: QuestionType) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index
          ? {
              ...q,
              type,
              options:
                type === "checkbox"
                  ? [createNewOption(), createNewOption()]
                  : [],
            }
          : q,
      ),
    );
  };

  const addOption = (qIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, createNewOption()] } : q,
      ),
    );
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.filter((_, oi) => oi !== oIndex) }
          : q,
      ),
    );
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, oi) =>
                oi === oIndex ? { ...o, text: value } : o,
              ),
            }
          : q,
      ),
    );
  };

  const resetQuestion = (index: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...createNewQuestion(), id: q.id } : q,
      ),
    );
    setErrors((prev) => {
      const updated = { ...prev.questions };
      delete updated[index];
      return { ...prev, questions: updated };
    });
  };

  const resetForm = () => {
    setTitle("");
    setQuestions([createNewQuestion()]);
    setErrors({ title: "", questions: {} });
    setServerError("");
    setIsSuccess(false);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = { title: "", questions: {} };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "Quiz title is required";
      isValid = false;
    }

    questions.forEach((q, qIndex) => {
      const qError = DEFAULT_QUESTION_ERROR();
      let hasError = false;

      if (!q.text.trim()) {
        qError.text = "Question text is required";
        isValid = false;
        hasError = true;
      }

      if (q.type === "checkbox") {
        if (q.options.length < 2) {
          qError.optionsGeneral = "Add at least 2 options";
          isValid = false;
          hasError = true;
        } else {
          q.options.forEach((o, oIndex) => {
            if (!o.text.trim()) {
              qError.options[oIndex] = "Option text is required";
              isValid = false;
              hasError = true;
            }
          });
        }
      }

      if (hasError) newErrors.questions[qIndex] = qError;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError("");

    try {
      const payload = {
        title,
        questions: questions.map((q) => ({
          text: q.text,
          type: q.type,
          options:
            q.type === "checkbox"
              ? q.options.map((o) => ({ text: o.text }))
              : q.type === "boolean"
                ? [{ text: "True" }, { text: "False" }]
                : [],
        })),
      };

      await quizService.createQuiz(payload);
      setIsSuccess(true);
    } catch {
      setServerError("Failed to create quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    questions,
    errors,
    isLoading,
    serverError,
    isSuccess,
    setIsSuccess,
    addQuestion,
    removeQuestion,
    updateQuestionText,
    updateQuestionType,
    addOption,
    removeOption,
    updateOption,
    resetQuestion,
    resetForm,
    handleSubmit,
  };
};
