import { QuestionType } from "@/types/quiz";
import { QuestionDraft, QuestionError } from "../../types";
import styles from "./QuestionFieldset.module.scss";
import { CheckboxField } from "../CheckboxField/CheckboxField";
import { Button } from "@/components/Button/Button";
import { BooleanField } from "../BooleanField/Boolean";
import { InputField } from "../InputField/InputField";
import { QuestionTypeField } from "../QuestionTypeField/QuestionTypeField";

type Props = {
  question: QuestionDraft;
  index: number;
  error?: QuestionError;
  isLoading: boolean;
  totalQuestions: number;
  onUpdateText: (index: number, value: string) => void;
  onUpdateType: (index: number, type: QuestionType) => void;
  onAddOption: (index: number) => void;
  onRemoveOption: (qIndex: number, oIndex: number) => void;
  onUpdateOption: (qIndex: number, oIndex: number, value: string) => void;
  onReset: (index: number) => void;
  onRemove: (index: number) => void;
};

export const QuestionFieldset: React.FC<Props> = ({
  question,
  index,
  error,
  isLoading,
  totalQuestions,
  onUpdateText,
  onUpdateType,
  onUpdateOption,
  onRemove,
  onAddOption,
  onRemoveOption,
  onReset,
}) => {
  return (
    <fieldset key={question.id} className={styles.question}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`question-${question.id}`}>
          Question {index + 1}
        </label>
        <input
          id={`question-${question.id}`}
          className={`${styles.input} ${isLoading ? styles.disabled : ""}`}
          type="text"
          value={question.text}
          disabled={isLoading}
          onChange={(e) => onUpdateText(index, e.target.value)}
        />
        {error?.text && <p className={styles.error}>{error.text}</p>}
      </div>

      <div
        className={styles.radioGroup}
        role="radiogroup"
        aria-label="Question type"
      >
        {(["input", "boolean", "checkbox"] as QuestionType[]).map((type) => (
          <QuestionTypeField
            key={type}
            question={question}
            type={type}
            onUpdateType={onUpdateType}
            isLoading={isLoading}
            index={index}
          />
        ))}
      </div>

      {question.type === "boolean" && <BooleanField />}

      {question.type === "input" && <InputField />}

      {question.type === "checkbox" && (
        <CheckboxField
          options={question.options}
          error={error}
          isLoading={isLoading}
          onAdd={() => onAddOption(index)}
          onRemove={(oIndex) => onRemoveOption(index, oIndex)}
          onUpdate={(oIndex, value) => onUpdateOption(index, oIndex, value)}
        />
      )}

      <div className={styles.questionActions}>
        {(question.text || question.options.some((o) => o.text)) && (
          <Button
            className={`${styles.buttonSecondary} ${isLoading ? styles.disabled : ""}`}
            disabled={isLoading}
            onClick={() => onReset(index)}
          >
            Reset Question
          </Button>
        )}

        {totalQuestions > 1 && (
          <Button
            className={`${styles.buttonRemove} ${isLoading ? styles.disabled : ""}`}
            disabled={isLoading}
            onClick={() => onRemove(index)}
          >
            Remove Question
          </Button>
        )}
      </div>
    </fieldset>
  );
};
