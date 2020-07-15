import { Request, Response} from 'express';
import { container } from 'tsyringe';
import UpdatedUserAvatarService from '@modules/users/services/UpdatedUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response) : Promise<Response> {
    const updatedUserAvatarService = container.resolve(UpdatedUserAvatarService);
    const user = await updatedUserAvatarService.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.status(200).json(user);
  }
}
