import { Request, Response } from 'express';
import AdminService from '../service/AdminService';
import Admin from '../entity/Admin';

class AdminController {
  public async index(_: Request, response: Response): Promise<Response> {
    try {
      const data: Admin[] | undefined = await AdminService.index();

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Index Admin Failed' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const data: Admin | undefined = await AdminService.show(
        request.params.id
      );

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Show Admin Failed' });
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      await AdminService.store(request.body);

      return response.status(201).json({ Message: 'New Admin Created' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Store Admin Failed' });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      await AdminService.update(request.params.id, request.body);

      return response.status(200).json({ Message: 'Admin Updated' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Update Admin Failed' });
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
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Destroy Admin Failed' });
    }
  }

  public async auth(request: Request, response: Response): Promise<Response> {
    try {
      const data = await AdminService.auth(request.body);

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Auth Admin Failed' });
    }
  }
}

export default new AdminController();
