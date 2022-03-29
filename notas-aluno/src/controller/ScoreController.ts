import { Request, Response } from "express"
import { scoreLogger } from "../config/logger";
import Score from "../entity/Score"
import ScoreService from "../service/ScoreService";

type TReq = Request & {
  userId: Request<[string], unknown, number, unknown> | unknown | string;
  headers: {
    authorization: string;
  };
};

class ScoreController {
  public async index(request: TReq, response: Response): Promise<Response> {
    try {
      const data: Score = await ScoreService.index(request.userId);

      return response.status(200).json(data);
    } catch (error) {
      scoreLogger.error(error);
      return response.status(400).json({ Message: 'Index Score Failed' });
    }
  }
}


export default new ScoreController()
