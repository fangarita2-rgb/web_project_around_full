import { Router } from 'express';
import usersRouter from './users.js';
import cardsRouter from './cards.js';
<<<<<<< HEAD
=======
import authRouter from './auth.js';
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
import { auth } from '../middleware/auth.js';

const router = Router();

<<<<<<< HEAD
=======
// Rutas públicas (no requieren token)
router.use(authRouter);

>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
// Middleware de autenticación — protege todo lo que sigue
router.use(auth);

// Rutas protegidas
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;