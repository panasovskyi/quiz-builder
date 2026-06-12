"use client";

import styles from "./page.module.scss";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { SuccessBlock } from "./components/SuccessBlock/SuccessBlock";
import { Button } from "@/components/Button/Button";
import { QuestionFieldset } from "./components/QuestionFieldset/QuestionFieldset";
import { useQuizForm } from "./useQuizForm";

export default function CreatePage() {
  const {
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
  } = useQuizForm();

  if (isSuccess) {
    return (
      <div className={styles.page}>
        <SuccessBlock onReset={resetForm} onClose={() => setIsSuccess(false)} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader title="Create a new Quiz" link="/" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="quiz-title">
            Quiz title
          </label>
          <input
            id="quiz-title"
            className={`${styles.input} ${isLoading ? styles.disabled : ""}`}
            type="text"
            value={title}
            disabled={isLoading}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>

        {questions.map((q, i) => (
          <QuestionFieldset
            key={q.id}
            question={q}
            index={i}
            error={errors.questions[i]}
            isLoading={isLoading}
            totalQuestions={questions.length}
            onUpdateText={updateQuestionText}
            onUpdateType={updateQuestionType}
            onAddOption={addOption}
            onRemoveOption={removeOption}
            onUpdateOption={updateOption}
            onReset={resetQuestion}
            onRemove={removeQuestion}
          />
        ))}

        <div className={styles.formActions}>
          <Button
            className={`${styles.buttonSecondary} ${isLoading ? styles.disabled : ""}`}
            onClick={addQuestion}
            disabled={isLoading}
          >
            + Add Question
          </Button>

          {(questions.length > 1 || title) && (
            <Button
              className={`${styles.buttonSecondary} ${isLoading ? styles.disabled : ""}`}
              onClick={resetForm}
              disabled={isLoading}
            >
              Reset Question
            </Button>
          )}
        </div>

        {serverError && <p className={styles.error}>{serverError}</p>}
        <Button
          type="submit"
          className={`${styles.buttonSubmit} ${isLoading ? styles.disabled : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Quiz"}
        </Button>
      </form>
    </div>
  );
}
