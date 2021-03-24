import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository, Not } from 'typeorm';

export default class UsersRepository implements IUsersRepository {
  private omrRepository: Repository<User>;

  constructor() {
    this.omrRepository = getRepository(User);
  }

  public async findAllProviders({
    expect_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (expect_user_id) {
      return this.omrRepository.find({
        where: {
          id: Not(expect_user_id),
        },
      });
    }
    return this.omrRepository.find();
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
