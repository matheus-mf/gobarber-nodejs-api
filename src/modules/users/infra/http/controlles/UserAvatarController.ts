import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import { Request, Response } from 'express';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UploadUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
