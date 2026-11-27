import { Router } from 'express';
import {
  getUsers,
  getCurrentUser,
  getUserById,
<<<<<<< HEAD
=======
  createUser,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
  updateProfile,
  updateAvatar,
} from '../controllers/users.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:id', getUserById);
<<<<<<< HEAD
=======
usersRouter.post('/', createUser);
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter;