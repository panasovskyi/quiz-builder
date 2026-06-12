import styles from './InputGroup.module.scss';

export const InputAnswer = () => (
  <div className={styles.inputGroup}>
    <input type="text" className={styles.textInput} placeholder="User will type their answer here..." disabled />
  </div>
);