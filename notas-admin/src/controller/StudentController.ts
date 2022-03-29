import { Request, Response } from 'express';
import StudentService from '../service/StudentService';
import Student from '../entity/Student';

class StudentController {
  public async indexStudent(req: Request, response: Response): Promise<Response> {
    try {
      const data: any[] | undefined = await StudentService.indexStudent();

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Index Student Failed' });
    }
  }

  public async storeStudent(request: Request, response: Response): Promise<Response> {
    try {
      await StudentService.storeStudent(request.params.id, request.body);

      return response.status(201).json({ Message: 'New Student Created or Updated' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Store Student Failed' });
    }
  }
}

export default new StudentController();
