import { Request, Response, Router } from 'express';
import AdminController from './controller/AdminController';
import StudentController from './controller/StudentController';
import authMiddleware from './middlewares/auth';
import authAdminMiddleware from './middlewares/authAdmin';

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
routes.get('/admin', authAdminMiddleware, AdminController.index);
routes.get('/admin/:id', authAdminMiddleware, AdminController.show);
routes.put('/admin/:id', authAdminMiddleware, AdminController.update);
routes.post('/admin', authAdminMiddleware, AdminController.store);
routes.delete('/admin/:id', authAdminMiddleware, AdminController.destroy);
routes.post('/admin/login', AdminController.auth);

// routes Student
routes.get('/student', authMiddleware, StudentController.indexStudent);
routes.post('/student', authMiddleware, StudentController.storeStudent);
routes.post('/student/:id', authMiddleware, StudentController.storeStudent);

export default routes;
