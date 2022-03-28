import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import Score from '../entity/Score';
import Student from '../entity/Student';

class StudentService {
  public async indexStudent(): Promise<Student[] | undefined> {
    return getRepository(Student).find();

  }

  public async storeStudent(body: any): Promise<any> {
    await getRepository(Student).save(body);

    const data: Student | undefined = await getRepository(Student).findOne({
      where: {
        firstName: body.firstName
      }
    });

    if (!data) {
      throw new Error('Not found Student')
    }

    const { n1, n2, n3, n4 } = body

    const score: Score = {
      id: v4(),
      idStudent: data,
      n1,
      n2,
      n3,
      n4
    }

    return getRepository(Score).save(score);
  }
}

export default new StudentService();
