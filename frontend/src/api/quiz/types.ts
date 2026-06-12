export type QuizzesResponse = {
  id: string;
  title: string;
  questions_count: string;
};

export type QuizResponse = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: QuestionResponse[];
};

export type QuestionResponse = {
  id: string;
  quiz_id: string;
  text: string;
  type: QuestionTypeResponse;
  options: OptionResponse[];
  createdAt: string;
  updatedAt: string;
};

export type OptionResponse = {
  id: string;
  question_id: string;
  text: string;
  is_correct: boolean;
  createdAt: string;
  updatedAt: string;
};

type QuestionTypeResponse = "boolean" | "input" | "checkbox";

type CreateOptionDto = {
  text: string;
};

export type CreateQuestionDto = {
  text: string;
  type: QuestionTypeResponse;
  options: CreateOptionDto[];
};

export type DeleteQuizResponse = {
  message: string;
};
