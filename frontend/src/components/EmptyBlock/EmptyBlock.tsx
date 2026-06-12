import styles from './EmptyBlock.module.scss';
import { Button } from '../Button/Button';

type Props = {
  message: string;
  link?: string;
  linkText?: string;
};

export const EmptyBlock: React.FC<Props> = ({ message, link, linkText }) => {
  return (
    <div className={styles.emptyBlock}>
      <p className={styles.emptyText}>{message}</p>
      {link && linkText && (
        <Button href="/create" className={styles.buttonCreate}>
          Create a new Quiz
        </Button>
      )}
    </div>
  );
};