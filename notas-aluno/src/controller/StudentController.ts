import { Request, Response } from "express"
import { studentLogger } from "../config/logger";
import StudentService from "../service/StudentService";

class StudentController {
  public async auth(request: Request, response: Response): Promise<Response> {
    try {
      const data = await StudentService.auth(request.body);

      return response.status(200).json(data);
    } catch (error) {
      studentLogger.error(error);
      return response.status(400).json({ Message: 'Auth Student Failed' });
    }
  }
}


export default new StudentController()
