import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdatedUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdatedUserAvatarService;
