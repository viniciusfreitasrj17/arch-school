import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import Score from '../entity/Score';
import Student from '../entity/Student';

class StudentService {
  public async indexStudent(): Promise<any[]> {
    const data: Student[] = await getRepository(Student).find();

    const newData: Promise<any[]> = Promise.resolve(
      Object.keys(data).map((key): any => {
        return data[Number(key)].scores.map((score: Score) => {
          const { n1, n2, n3, n4 } = score;

          const average = (n1 + n2 + n3 + n4) / 4
          let situation: string

          if (average < 4) situation = "Reprovado"
          else if (average >= 4 && average < 6) situation = "Recuperação"
          else situation = "Aprovado"

          const scores = data[Number(key)].scores
            .map((score: Score) => ({
              ...score,
              average,
              situation
            }))

          return {
            ...data[Number(key)],
            scores,
          }
        })[0]
      })
    )

    return newData;
  }

  public async storeStudent(id: any, body: any): Promise<any> {
    let studant: Student | undefined;

    if (id) {
      studant = await getRepository(Student).findOne({
        where: {
          id
        }
      })

      if (!studant) {
        throw new Error('Not found Student')
      }

      const newStudant = {
        firstName: body.firstName || studant.firstName,
        lastName: body.lastName || studant.lastName,
      }

      await getRepository(Student).update(studant.id, newStudant);

      const score: Score | undefined = await getRepository(Score).findOne({
        where: {
          id: studant.scores[0].id
        }
      })

      if (!score) {
        throw new Error('Not found Student')
      }

      const newScore = {
        n1: body.n1 || score.n1,
        n2: body.n2 || score.n2,
        n3: body.n3 || score.n3,
        n4: body.n4 || score.n4
      }

      return getRepository(Score).update(score.id, newScore);
    } else {

      studant = await getRepository(Student).save(body);

      if (!studant) {
        throw new Error('Not found Student')
      }

      const { n1, n2, n3, n4 } = body

      const score: Score = {
        id: v4(),
        idStudent: studant,
        n1,
        n2,
        n3,
        n4
      }

      return getRepository(Score).save(score);
    }
  }
}

export default new StudentService();
