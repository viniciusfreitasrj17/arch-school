import { Request, Response } from "express"
import { studentLogger } from "../config/logger";
import StudentService from "../service/StudentService";

class StudentController {
  public async auth(request: Request, response: Response): Promise<Response> {
    try {
      const data = await StudentService.auth(request.body);

      return response.status(200).json(data);
    } catch (error: any) {
      studentLogger.error(error.message);
      return response.status(400).json({ Message: 'Auth Student Failed', Error: error.message });
    }
  }
}


export default new StudentController()
