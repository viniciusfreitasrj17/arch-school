import { Request, Response, Router } from 'express';
import ScoreController from './controller/ScoreController';
import StudentController from './controller/StudentController';
import authMiddleware from './middlewares/auth';

const routes: Router = Router();

// routes Hello
routes.get('/health', (_: Request, res: Response): Response<unknown> => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  };

  return res.status(200).json({ data });
});

// routes Student
routes.post('/student/login', StudentController.auth);

// routes Score
routes.get('/score', authMiddleware, ScoreController.index);

export default routes;
