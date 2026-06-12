export type QuizShort = {
  id: string;
  title: string;
  questionsCount: number;
}

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
}

export type Question = {
  id: string;
  quizId: string;
  text: string;
  type: QuestionType;
  options: Option[];
}

export type Option = {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
};

export type QuestionType = "boolean" | "input" | "checkbox";