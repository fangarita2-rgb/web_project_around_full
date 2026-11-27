import { Router } from 'express';
import usersRouter from './users.js';
import cardsRouter from './cards.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Middleware de autenticación — protege todo lo que sigue
router.use(auth);

// Rutas protegidas
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;