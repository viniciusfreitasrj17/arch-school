import { validate } from 'class-validator';
import { getRepository, UpdateResult } from 'typeorm';
import { compare, hash } from 'bcryptjs'
import Admin from '../entity/Admin';
import { BCRYPT_HASH_ROUND } from '../config'
import { generateToken } from '../utils/generateToken';

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
      console.log(erros.map(content => content.constraints))
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
      throw new Error('E-mail is already being used')
    }

    const data = await getRepository(Admin).findOne({ where: { id } });

    if (!data) {
      throw new Error('Not Found Admin')
    }

    const newAdmin = getRepository(Admin).create({
      firstName: firstName || data.firstName,
      lastName: lastName || data.lastName,
      email: email || data.email,
      password: password || data.password,
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
      throw new Error('Not Found Admin')
    }

    if (password !== String) {
      password = password.toString();
    }

    if (!(await compare(password, admin.password))) {
      throw new Error('Invalid Password');
    }

    delete admin.password;

    return { admin, token: generateToken({ id: admin.id }) };
  }
}

export default new AdminService();
