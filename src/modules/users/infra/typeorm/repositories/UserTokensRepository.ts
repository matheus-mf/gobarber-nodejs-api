import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';

export default class UserTokensRepository implements IUserTokensRepository {
  private omrRepository: Repository<UserToken>;

  constructor() {
    this.omrRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.omrRepository.create({ user_id });
    await this.omrRepository.save(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.omrRepository.findOne({
      where: { token },
    });
  }
}
