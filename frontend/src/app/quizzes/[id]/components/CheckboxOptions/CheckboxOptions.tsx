import { Question } from '@/types/quiz';
import styles from './CheckboxOptions.module.scss';

export const CheckboxOptions: React.FC<{ question: Question }> = ({ question }) => (
  <div className={styles.optionsGroup}>
    {question.options?.map((o) => (
      <label key={o.id} className={styles.optionLabel} htmlFor={`option-${o.id}`}>
        <input id={`option-${o.id}`} type="checkbox" name={`question-${question.id}`} className={styles.checkboxInput} value={o.text} disabled />
        <span className={styles.customCheckbox} />
        <span className={styles.optionText}>{o.text}</span>
      </label>
    ))}
  </div>
);