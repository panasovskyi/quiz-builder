import { Request, Response } from "express";
import quizService from "../services/quizService";

const quizController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, questions } = req.body;

      if (!title || typeof title !== "string") {
        res
          .status(400)
          .json({ error: "Quiz title is required and must be a string." });
        return;
      }

      const quiz = await quizService.create(title, questions);
      res.status(201).json(quiz);
    } catch (error) {
      console.error("Error in createQuiz controller:", error);
      res.status(500).json({ error: "Failed to create quiz" });
    }
  },

  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const quizzes = await quizService.findAll();
      res.status(200).json(quizzes);
    } catch (error) {
      console.error("Error in getAllQuizzes controller:", error);
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    if (!id) {
      res.status(400).json({ error: "Wrong id" });
      return;
    }

    try {
      const quiz = await quizService.findById(id);

      if (!quiz) {
        res.status(404).json({ error: "Quiz not found" });
        return;
      }

      res.status(200).json(quiz);
    } catch (error) {
      console.error("Error in getQuizById controller:", error);
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    if (!id) {
      res.status(400).json({ error: "Wrong id" });
      return;
    }

    try {
      const deletedCount = await quizService.delete(id);

      if (deletedCount === 0) {
        res.status(404).json({ error: "Quiz not found" });
        return;
      }

      res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
      console.error("Error in deleteQuiz controller:", error);
      res.status(500).json({ error: "Failed to delete a quiz" });
    }
  },
};

export default quizController;
