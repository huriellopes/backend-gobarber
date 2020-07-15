import path from 'path';
import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdatedUserAvatarService {
  constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository,
    ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change avatar.', 401);

    if (user.avatar) {
      // Deletar avatar anterior
      const userAtavarFilePath = path.join(uploadConfig.diretory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAtavarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAtavarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdatedUserAvatarService;
