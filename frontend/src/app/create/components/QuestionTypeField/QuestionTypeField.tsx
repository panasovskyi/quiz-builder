import { QuestionType } from '@/types/quiz';
import styles from './QuestionTypeField.module.scss';
import { QuestionDraft } from '../../types';

type Props = {
  type: QuestionType;
  question: QuestionDraft;
  isLoading: boolean;
  index: number;
  onUpdateType: (i: number, type: QuestionType) => void;
}

export const QuestionTypeField: React.FC<Props> = ({ type, question, isLoading, index, onUpdateType }) => {
  return (
    <label
      key={type}
      className={styles.radioLabel}
      htmlFor={`type-${question.id}-${type}`}
    >
      <input
        id={`type-${question.id}-${type}`}
        className={`${styles.radio} ${isLoading ? styles.disabled : ""}`}
        name={`type-${question.id}`}
        type="radio"
        value={type}
        disabled={isLoading}
        checked={question.type === type}
        onChange={() => onUpdateType(index, type)}
      />
      {type}
    </label>
  )
}