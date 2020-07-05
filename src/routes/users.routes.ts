import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UpdatedUserAvatarService from '../services/UpdatedUserAvatarService';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// eslint-disable-next-line consistent-return
usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const updatedUserAvatarService = new UpdatedUserAvatarService();
    const user = await updatedUserAvatarService.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.status(200).json(user);
  },
);

export default usersRouter;
