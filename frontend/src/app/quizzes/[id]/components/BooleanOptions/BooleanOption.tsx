import { Question } from '@/types/quiz';
import styles from './BooleanOptions.module.scss';

export const BooleanOptions: React.FC<{ question: Question }> = ({ question }) => (
  <div className={styles.optionsGroup}>
    {(question.options?.length > 0
      ? question.options
      : [{ id: `${question.id}-true`, text: 'True' }, { id: `${question.id}-false`, text: 'False' }]
    ).map((o) => (
      <label key={o.id} className={styles.optionLabel} htmlFor={`option-${o.id}`}>
        <input id={`option-${o.id}`} type="radio" name={`question-${question.id}`} className={styles.radioInput} value={o.text} disabled />
        <span className={styles.customRadio} />
        <span className={styles.optionText}>{o.text}</span>
      </label>
    ))}
  </div>
);