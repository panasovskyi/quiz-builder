import { Router } from 'express';
import quizController from '../controllers/quizController';

const router = Router();

router.post('/quizzes', quizController.create);

router.get('/quizzes', quizController.getAll);

router.get('/quizzes/:id', quizController.getById);

router.delete('/quizzes/:id', quizController.delete);

export default router;