import { differenceInHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('IHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not existis.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not existis.');
    }

    const tokenCreatedAt = userToken.crated_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
