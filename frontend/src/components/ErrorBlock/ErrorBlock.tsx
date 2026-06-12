import styles from './ErrorBlock.module.scss';

type Props = {
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
};

export const ErrorBlock: React.FC<Props> = ({ message, onRetry, onClose }) => {
  return (
    <div className={styles.errorBlock}>
      <p className={styles.errorText}>{message}</p>
      {onRetry && (
        <button className={styles.buttonRetry} type="button" onClick={onRetry}>
          Try again
        </button>
      )}
      {onClose && (
        <button className={styles.buttonClose} type="button" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};