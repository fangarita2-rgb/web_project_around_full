import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// POST /signup — manejado en controllers/users.ts (createUser)

// POST /signin — Inicia sesión y devuelve token
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw Object.assign(new Error('Los campos email y password son obligatorios'), {
      statusCode: 400,
    });
  }

  const user = await User.findUserByCredentials(email, password);

  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET ?? 'dev-secret-key',
    { expiresIn: '7d' },
  );

  res.json({
    token,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    },
  });
};