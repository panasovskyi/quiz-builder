export type QuestionType = "boolean" | "input" | "checkbox";

export interface IQuiz {
  title: string;
  questions: IQuestion[];
}

export interface IQuestion {
  text: string;
  type: QuestionType;
  options?: IOption[];
}

export interface IOption {
  text: string;
  is_correct: boolean;
}