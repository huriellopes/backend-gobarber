import { Request, Response} from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id: id });

    return res.status(200).json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { name, email, old_password, password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id: id,
      name,
      email,
      old_password,
      password,
    });

    return res.status(201).json(classToClass(user));
  }
}
