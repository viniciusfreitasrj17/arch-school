import { Request, Response } from 'express';
import AdminService from '../service/AdminService';
import Admin from '../entity/Admin';
import { adminLogger } from '../config/logger';

class AdminController {
  public async index(_: Request, response: Response): Promise<Response> {
    try {
      const data: Admin[] | undefined = await AdminService.index();

      return response.status(200).json(data);
    } catch (error: any) {
      adminLogger.error(error.message);
      return response.status(400).json({ Message: 'Index Admin Failed', Error: error.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const data: Admin | undefined = await AdminService.show(
        request.params.id
      );
      if (!data) throw new Error('Admin not found')

      return response.status(200).json(data);
    } catch (error: any) {
      adminLogger.error(error.message);
      return response.status(400).json({ Message: 'Show Admin Failed', Error: error.message });
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      await AdminService.store(request.body);

      return response.status(201).json({ Message: 'New Admin Created' });
    } catch (error: any) {
      adminLogger.error(error.message);
      return response.status(400).json({ Message: 'Store Admin Failed', Error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      await AdminService.update(request.params.id, request.body);

      return response.status(200).json({ Message: 'Admin Updated' });
    } catch (error: any) {
      adminLogger.error(error.message);
      return response.status(400).json({ Message: 'Update Admin Failed', Error: error.message });
    }
  }

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const data: Admin = await AdminService.destroy(request.params.id);

      return response
        .status(200)
        .json({ Message: `Admin ${data.firstName} deleted` });
    } catch (error: any) {
      adminLogger.error(error.message);
      return response.status(400).json({ Message: 'Destroy Admin Failed', Error: error.message });
    }
  }

  public async auth(request: Request, response: Response): Promise<Response> {
    try {
      const data = await AdminService.auth(request.body);

      return response.status(200).json(data);
    } catch (error: any) {
      adminLogger.error(error.message);
      return response.status(400).json({ Message: 'Auth Admin Failed', Error: error.message });
    }
  }
}

export default new AdminController();
