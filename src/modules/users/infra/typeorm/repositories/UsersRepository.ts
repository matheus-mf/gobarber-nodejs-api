import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

export default class UsersRepository implements IUsersRepository {
  private omrRepository: Repository<User>;

  constructor() {
    this.omrRepository = getRepository(User);
  }

  public async create(userDate: ICreateUserDTO): Promise<User> {
    const user = this.omrRepository.create(userDate);
    await this.omrRepository.save(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.omrRepository.findOne({
      where: { email },
    });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.omrRepository.findOne(id);
  }

  public async save(user: User): Promise<User> {
    return this.omrRepository.save(user);
  }
}
