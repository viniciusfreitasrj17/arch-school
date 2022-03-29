import { compare } from 'bcryptjs';
import { pool } from '../config/database';
import { studentLogger } from '../config/logger';
import Student from '../entity/Student';
import { generateToken } from '../utils/generateToken';

class StudentService {
  public async auth(body: any): Promise<any> {
    let { email, password } = body;

    const student: Student = (await pool.query(
      'SELECT * FROM student WHERE email = $1', [email]
    )).rows[0]

    if (!student) {
      studentLogger.error('Not Found Student')
      throw new Error('Not Found Student')
    }

    if (password !== String) {
      password = password.toString();
    }

    if (!(await compare(password, student.password))) {
      studentLogger.error('Invalid Password')
      throw new Error('Invalid Password');
    }

    delete student.password;

    return { student, token: generateToken({ id: student.id }) };
  }
}

export default new StudentService();
