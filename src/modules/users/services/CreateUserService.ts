import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already user!');
    }

    const hashedPassword = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

export default CreateUserService;
