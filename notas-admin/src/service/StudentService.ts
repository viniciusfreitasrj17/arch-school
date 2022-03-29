import { hash } from 'bcryptjs';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { BCRYPT_HASH_ROUND } from '../config';
import { scoreLogger, studentLogger } from '../config/logger';
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
    if (id) {
      const { firstName, lastName, email, password } = body;

      if (await getRepository(Student).findOne({ where: { email } })) {
        throw new Error('E-mail is already being used')
      }

      const studant = await getRepository(Student).findOne({
        where: {
          id
        }
      })

      if (!studant) {
        studentLogger.error('Not found Student')
        throw new Error('Not found Student')
      }

      const newStudant: Student = getRepository(Student).create({
        firstName: firstName || studant.firstName,
        lastName: lastName || studant.lastName,
        email: email || studant.email,
        password: password || studant.password,
      })

      if (password) {
        if (password !== String) {
          newStudant.password = password.toString();
        }

        newStudant.password = await hash(
          newStudant.password,
          BCRYPT_HASH_ROUND
        );
      }

      await getRepository(Student).update(id, newStudant);

      const score: Score | undefined = await getRepository(Score).findOne({
        where: {
          id: studant.scores[0].id
        }
      })

      if (!score) {
        scoreLogger.error('Not found Score')
        throw new Error('Not found Score')
      }

      const newScore = {
        n1: body.n1 || score.n1,
        n2: body.n2 || score.n2,
        n3: body.n3 || score.n3,
        n4: body.n4 || score.n4
      }

      return getRepository(Score).update(score.id, newScore);
    } else {
      const { firstName, lastName, email, password } = body;

      if (await getRepository(Student).findOne({ where: { email } })) {
        studentLogger.error('E-mail is already being used')
        throw new Error('E-mail is already being used')
      }

      const student: Student = getRepository(Student).create({
        firstName,
        lastName,
        email,
        password,
      });

      const erros = await validate(student);

      if (erros.length !== 0) {
        studentLogger.error('Error Validation: ', erros.map(content => content.constraints))
        throw new Error('Error Validation')
      }

      if (password !== String) {
        student.password = password.toString();
      }

      student.password = await hash(student.password, BCRYPT_HASH_ROUND);

      const newStudant: Student = await getRepository(Student).save(student);

      const { n1, n2, n3, n4 } = body

      const score: Score = getRepository(Score).create({
        id_student: newStudant,
        n1,
        n2,
        n3,
        n4
      })

      return getRepository(Score).save(score);
    }
  }
}

export default new StudentService();
