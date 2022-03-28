import { Request, Response } from 'express';
import StudentService from '../service/StudentService';
import Student from '../entity/Student';

class StudentController {
  public async indexStudent(_: Request, response: Response): Promise<Response> {
    try {
      const data: Student[] | undefined = await StudentService.indexStudent();

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Index Student Failed' });
    }
  }

  public async storeStudent(request: Request, response: Response): Promise<Response> {
    try {
      await StudentService.storeStudent(request.body);

      return response.status(201).json({ Message: 'New Student Created' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ Message: 'Store Student Failed' });
    }
  }
}

export default new StudentController();
