import { pool } from '../config/database';
import Score from '../entity/Score';

class ScoreService {
  public async index(id: any): Promise<any> {
    const data =  (await pool.query('SELECT * FROM score WHERE id_student = $1', [id])).rows

    const newData: Promise<any> = Promise.resolve(
      data.map((score: Score) => {
        const { n1, n2, n3, n4 } = score;

        const average = (n1 + n2 + n3 + n4) / 4
        let situation: string

        if (average < 4) situation = "Reprovado"
        else if (average >= 4 && average < 6) situation = "Recuperação"
        else situation = "Aprovado"

        const scores = data
          .map((score: Score) => {
            delete score.id;
            delete score.id_student;
            delete score.createdAt;
            delete score.updatedAt;

            return {
              ...score,
              average,
              situation
            }
          })

        return {
          scores,
        }
      })[0]
    )

    return newData;
  }
}

export default new ScoreService();
