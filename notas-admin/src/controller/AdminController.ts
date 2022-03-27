import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Admin from '../entity/Admin';

class AdminController {
  public async index(_: Request, response: Response): Promise<Response> {
    try {
      const repo = getRepository(Admin);
      const data: Admin[] = await repo.find();

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Index Admin Failed' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const repo = getRepository(Admin);
      const data: Admin | undefined = await repo.findOne({
        where: { id: request.params.id }
      });

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Show Admin Failed' });
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const repo = getRepository(Admin);
      await repo.save(request.body);

      return response.status(201).json({ Message: 'New Admin Created' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Store Admin Failed' });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const repo = getRepository(Admin);
      await repo.update(request.params.id, request.body);

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
      const repo = getRepository(Admin);
      const userToRemove = await repo.findOne({
        where: {
          id: request.params.id
        }
      });

      if (!userToRemove) {
        return response.status(404).json({ Message: 'Admin not found' });
      }

      const data: Admin = await repo.remove(userToRemove);

      return response
        .status(200)
        .json({ Message: `Admin ${data.firstName} deleted` });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Destroy Admin Failed' });
    }
  }
}

export default new AdminController();
