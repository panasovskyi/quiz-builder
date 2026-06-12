import { Button } from '@/components/Button/Button';
import { OptionDraft, QuestionError } from '../../types';
import styles from './CheckboxField.module.scss';

type Props = {
  options: OptionDraft[];
  error?: QuestionError;
  isLoading: boolean;
  onAdd: () => void;
  onRemove: (oIndex: number) => void;
  onUpdate: (oIndex: number, value: string) => void;
};

export const CheckboxField: React.FC<Props> = ({
  options,
  error,
  isLoading,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  return (
    <div className={styles.options}>
      {error?.optionsGeneral && (
        <p className={styles.error}>{error.optionsGeneral}</p>
      )}
      {options.map((o, i) => (
        <div key={o.id} className={styles.optionRowContainer}>
          <div className={styles.optionRow}>
            <input
              className={`${styles.input} ${isLoading ? styles.disabled : ""}`}
              type="text"
              value={o.text}
              disabled={isLoading}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => onUpdate(i, e.target.value)}
            />
            {options.length > 2 && (
              <Button
                className={`${styles.buttonRemoveSmall} ${isLoading ? styles.disabled : ""}`}
                disabled={isLoading}
                onClick={() => onRemove(i)}
              >
                Remove
              </Button>
            )}
          </div>
          {error?.options[i] && (
            <p className={styles.error}>{error.options[i]}</p>
          )}
        </div>
      ))}
      <Button
        className={`${styles.buttonSecondary} ${isLoading ? styles.disabled : ""}`}
        disabled={isLoading}
        onClick={onAdd}
      >
        + Add Option
      </Button>
    </div>
  );
}; 