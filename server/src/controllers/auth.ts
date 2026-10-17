import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-key';

// POST /signup — Registra un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) {
    throw Object.assign(new Error('Los campos email y password son obligatorios'), {
      statusCode: 400,
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw Object.assign(new Error('Ya existe un usuario con ese correo electrónico'), {
      statusCode: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    about,
    avatar,
    email,
    password: hashedPassword,
  });

  const { password: _pw, ...userObject } = user.toObject();
  res.status(201).json(userObject);
};

// POST /signin — Inicia sesión y devuelve un token JWT
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw Object.assign(new Error('Los campos email y password son obligatorios'), {
      statusCode: 400,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (User as any).findUserByCredentials(email, password);

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
};