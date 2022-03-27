import { Request, Response, Router } from 'express';
import AdminController from './controller/AdminController';

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

// routes User
routes.get('/admin', AdminController.index);
routes.get('/admin/:id', AdminController.show);
routes.put('/admin/:id', AdminController.update);
routes.post('/admin', AdminController.store);
routes.delete('/admin/:id', AdminController.destroy);

export default routes;
