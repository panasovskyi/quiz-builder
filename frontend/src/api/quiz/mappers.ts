
import { Option, Question, Quiz, QuizShort } from '@/types/quiz';
import {
  OptionResponse,
  QuestionResponse,
  QuizResponse,
  QuizzesResponse,
} from "./types";

export const mapOption = (option: OptionResponse): Option => {
  return {
    id: option.id,
    questionId: option.question_id,
    isCorrect: option.is_correct,
    text: option.text,
  };
};

export const mapQuestion = (question: QuestionResponse): Question => {
  return {
    id: question.id,
    quizId: question.quiz_id,
    text: question.text,
    type: question.type,
    options: question.options.map(mapOption),
  };
};

export const mapQuiz = (quiz: QuizResponse): Quiz => {
  return {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map(mapQuestion),
  };
};

export const mapQuizShort = (quiz: QuizzesResponse): QuizShort => {
  return {
    id: quiz.id,
    title: quiz.title,
    questionsCount: Number(quiz.questions_count),
  };
};

