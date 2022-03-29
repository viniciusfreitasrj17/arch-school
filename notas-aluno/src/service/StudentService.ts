import { compare } from 'bcryptjs';
import { pool } from '../config/database';
import Student from '../entity/Student';
import { generateToken } from '../utils/generateToken';

class StudentService {
  public async auth(body: any): Promise<any> {
    let { email, password } = body;

    const student: Student = (await pool.query(
      'SELECT * FROM student WHERE email = $1', [email]
    )).rows[0]

    if (!student) {
      throw new Error('Not Found Student')
    }

    if (password !== String) {
      password = password.toString();
    }

    if (!(await compare(password, student.password))) {
      throw new Error('Invalid Password');
    }

    delete student.password;

    return { student, token: generateToken({ id: student.id }) };
  }
}

export default new StudentService();
