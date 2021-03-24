import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('Email already in use.');
    }

    Object.assign(user, {
      name,
      email,
    });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
