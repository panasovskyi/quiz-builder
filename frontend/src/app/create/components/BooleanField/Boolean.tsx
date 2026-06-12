import styles from './Boolean.module.scss';


export const BooleanField = () => {
  return (
    <div className={styles.booleanPreview}>
      <p className={styles.booleanOption}>True</p>
      <p className={styles.booleanOption}>False</p>
    </div>
  )
}