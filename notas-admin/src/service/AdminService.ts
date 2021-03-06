import { validate } from 'class-validator';
import { getRepository, UpdateResult } from 'typeorm';
import { compare, hash } from 'bcryptjs'
import Admin from '../entity/Admin';
import { BCRYPT_HASH_ROUND } from '../config'
import { generateToken } from '../utils/generateToken';
import { adminLogger } from '../config/logger';

class AdminService {
  public async index(): Promise<Admin[] | undefined> {
    return getRepository(Admin).find();
  }

  public async show(id: any): Promise<Admin | undefined> {
    return getRepository(Admin).findOne({ where: { id } });
  }

  public async store(body: any): Promise<any> {
    const { firstName, lastName, email, password } = body;

    if (await getRepository(Admin).findOne({ where: { email } })) {
      adminLogger.error('E-mail is already being used')
      throw new Error('E-mail is already being used')
    }

    const admin: Admin = getRepository(Admin).create({
      firstName,
      lastName,
      email,
      password,
    });

    const erros = await validate(admin);

    if (erros.length !== 0) {
      adminLogger.error('Error Validation: ', erros.map(content => content.constraints))
      throw new Error('Error Validation')
    }

    if (password !== String) {
      admin.password = password.toString();
    }

    admin.password = await hash(admin.password, BCRYPT_HASH_ROUND);

    return getRepository(Admin).save(admin);
  }

  public async update(id: any, body: any): Promise<UpdateResult> {
    const { firstName, lastName, email, password } = body;

    if (await getRepository(Admin).findOne({ where: { email } })) {
      adminLogger.error('E-mail is already being used')
      throw new Error('E-mail is already being used')
    }

    const admin = await getRepository(Admin).findOne({ where: { id } });

    if (!admin) {
      adminLogger.error('Not Found Admin')
      throw new Error('Not Found Admin')
    }

    const newAdmin = getRepository(Admin).create({
      firstName: firstName || admin.firstName,
      lastName: lastName || admin.lastName,
      email: email || admin.email,
      password: password || admin.password,
    });

    if (password) {
      if (password !== String) {
        newAdmin.password = password.toString();
      }

      newAdmin.password = await hash(
        newAdmin.password,
        BCRYPT_HASH_ROUND
      );
    }

    return getRepository(Admin).update(id, newAdmin);
  }

  public async destroy(id: any): Promise<Admin> {
    const admin: Admin | undefined = await getRepository(Admin).findOne({
      where: {
        id
      }
    });

    if (!admin) {
      adminLogger.error('Admin not found')
      throw new Error('Admin not found')
    }

    const data: Admin[] = await getRepository(Admin).remove([admin]);
    return data[0];
  }

  public async auth(body: any): Promise<any> {
    let { email, password } = body;

    const admin: any = await getRepository(Admin).findOne({
      where: { email },
      select: [
        'firstName',
        'lastName',
        'email',
        'password'
      ]
    });

    if (!admin) {
      adminLogger.error('Admin not found')
      throw new Error('Admin not found')
    }

    if (password !== String) {
      password = password.toString();
    }

    if (!(await compare(password, admin.password))) {
      adminLogger.error('Invalid Password')
      throw new Error('Invalid Password');
    }

    delete admin.password;

    return { admin, token: generateToken({ id: admin.id }) };
  }
}

export default new AdminService();
