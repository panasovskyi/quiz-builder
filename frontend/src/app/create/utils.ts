import { OptionDraft, QuestionDraft, QuestionError } from './types';

export const createNewOption = (): OptionDraft => ({
  id: Math.random().toString(36).substring(2, 9),
  text: "",
});
export const createNewQuestion = (): QuestionDraft => ({
  id: Math.random().toString(36).substring(2, 9),
  text: "",
  type: "input",
  options: [],
});

export const DEFAULT_QUESTION_ERROR = (): QuestionError => ({
  text: "",
  options: {},
  optionsGeneral: "",
});
