import { Quiz, QuizShort } from '@/types/quiz';
import { apiClient } from "./instance";
import { mapQuiz, mapQuizShort } from './mappers';
import { CreateQuestionDto, DeleteQuizResponse, QuizResponse, QuizzesResponse } from './types';

export type CreatQuizDto = {
  title: string;
  questions: CreateQuestionDto[];
};

export const quizService = {
  async getAllQuizzes(): Promise<QuizShort[]> {
    const res = await apiClient.get<QuizzesResponse[]>("quizzes");

    return res.data.map(mapQuizShort);

  },

  async getQuizById(id: string): Promise<Quiz> {
    const res = await apiClient.get<QuizResponse>(`quizzes/${id}`);

    return mapQuiz(res.data);
  },

  async createQuiz(body: CreatQuizDto): Promise<QuizResponse> {
    const res = await apiClient.post<QuizResponse>("quizzes", body);

    return res.data;
  },

  async deleteQuiz(id: string): Promise<DeleteQuizResponse> {
    const res = await apiClient.delete<DeleteQuizResponse>(`quizzes/${id}`);

    return res.data;
  },
};
