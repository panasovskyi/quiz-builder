import { Button } from '@/components/Button/Button';
import styles from './SuccessBlock.module.scss';

type Props = {
  onReset: () => void;
  onClose: () => void;
};

export const SuccessBlock: React.FC<Props> = ({ onReset, onClose }) => {
  const handleCreateAnother = () => {
    onReset();
    onClose();
  };

  return (
    <div className={styles.successBlock}>
      <div className={styles.successIcon}>✓</div>
      <h2 className={styles.successTitle}>Quiz Created Successfully!</h2>
      <p className={styles.successText}>
        Your new quiz is now live and ready to be taken.
      </p>
      <div className={styles.successActions}>
        <Button
          href=""
          className={styles.buttonSubmit}
          onClick={handleCreateAnother}
        >
          Create Another Quiz
        </Button>

        <Button
          href="/quizzes"
          className={styles.buttonSecondary}
        >
          See All Quizzes
        </Button>
      </div>
    </div>
  );
};