import { Request, Response, Router } from 'express';
import AdminController from './controller/AdminController';
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

// routes Admin
routes.get('/admin', AdminController.index);
routes.get('/admin/:id', AdminController.show);
routes.put('/admin/:id', AdminController.update);
routes.post('/admin', AdminController.store);
routes.delete('/admin/:id', AdminController.destroy);
routes.post('/admin/login', AdminController.auth);

// routes Student
routes.get('/student', authMiddleware, StudentController.indexStudent);
routes.post('/student', authMiddleware, StudentController.storeStudent);
routes.post('/student/:id', authMiddleware, StudentController.storeStudent);

export default routes;
