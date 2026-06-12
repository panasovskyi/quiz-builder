import Link from 'next/link';
import { QuizShort } from '@/types/quiz';
import styles from './QuizCard.module.scss';
import { Button } from '@/components/Button/Button';

type Props = {
  quiz: QuizShort;
  isDeleting: boolean;
  isAnyDeleting: boolean;
  onDelete: (id: string, e: React.MouseEvent) => void;
};

export const QuizCard: React.FC<Props> = ({ quiz, isDeleting, isAnyDeleting, onDelete }) => {
  return (
    <li className={`${styles.item} ${isDeleting ? styles.itemDeleting : ''}`}>
      <Button
        className={`${styles.buttonDelete} ${isDeleting ? styles.buttonDeletingText : ''}`}
        onClick={(e) => onDelete(quiz.id, e)}
        disabled={isAnyDeleting}
      >
        Delete
      </Button>

      <Link
        href={`/quizzes/${quiz.id}`}
        className={`${styles.cardLink} ${isDeleting ? styles.disabledLink : ''}`}
      >
        <h3 className={styles.cardTitle}>{quiz.title}</h3>
        <p className={styles.cardInfo}>
          Number of questions: <span>{quiz.questionsCount}</span>
        </p>
      </Link>
    </li>
  );
};