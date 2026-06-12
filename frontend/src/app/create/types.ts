import { QuestionType } from '@/types/quiz';

export interface OptionDraft {
  id: string;
  text: string;
}

export interface QuestionDraft {
  id: string;
  text: string;
  type: QuestionType;
  options: OptionDraft[];
}

export interface QuestionError {
  text: string;
  options: Record<number, string>;
  optionsGeneral: string;
}

export interface FormErrors {
  title: string;
  questions: Record<number, QuestionError>;
}
