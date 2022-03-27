import { getRepository, UpdateResult } from 'typeorm';
import Admin from '../entity/Admin';

class AdminService {
  public async index(): Promise<Admin[] | undefined> {
    return getRepository(Admin).find();
  }

  public async show(id: any): Promise<Admin | undefined> {
    return getRepository(Admin).findOne({ where: { id } });
  }

  public async store(body: any): Promise<any> {
    return getRepository(Admin).save(body);
  }

  public async update(id: any, body: any): Promise<UpdateResult> {
    return getRepository(Admin).update(id, body);
  }

  public async destroy(admin: Admin): Promise<Admin> {
    const data: Admin[] = await getRepository(Admin).remove([admin]);
    return data[0];
  }
}

export default new AdminService();
