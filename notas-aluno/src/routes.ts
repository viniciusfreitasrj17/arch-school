import { Request, Response, Router } from 'express';
import UserController from './controller/UserController';

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

// routes Admin
routes.get('/user', UserController.all);

export default routes;
