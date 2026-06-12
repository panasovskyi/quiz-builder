import Link from 'next/link';
import styles from './PageHeader.module.scss';

type Props = {
  title: string;
  link: string;
}
export const PageHeader: React.FC<Props> = ({ title, link }) => {
  return (
    <header className={styles.header}>
      <Link href={link} className={styles.buttonBack} aria-label="Go back">
        ← <span>Back</span>
      </Link>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.headerSpacer} />
    </header>
  )
}