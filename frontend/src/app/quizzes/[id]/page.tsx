'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { quizService } from '@/api/quiz';
import { Spinner } from '@/components/Spinner/Spinner';
import styles from './page.module.scss';
import { ErrorBlock } from '@/components/ErrorBlock/ErrorBlock';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { QuestionBlock } from './components/QuestionBlock';

export default function QuizDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: quiz, isLoading, error } = useSWR(
    id ? `quizzes/${id}` : null,
    () => quizService.getQuizById(id)
  );

  return (
    <div className={styles.page}>

      <PageHeader title={quiz?.title || 'Loading...'} link='/quizzes' />
      
      {isLoading && (
        <div className={styles.centerContainer}>
          <Spinner />
        </div>
      )}

      {error && (
        <ErrorBlock message='Failed to load the quiz' />
      )}

      {!isLoading && quiz && (
        <form className={`${styles.form} ${styles.readOnly}`} onSubmit={(e) => e.preventDefault()}>
          {quiz.questions.map((q, qIndex) => (
            <QuestionBlock key={q.id} question={q} index={qIndex} />
          ))}
        </form>
      )}
    </div>
  );
}