import type { Request, Response } from 'express';
<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// POST /signup — manejado en controllers/users.ts (createUser)

// POST /signin — Inicia sesión y devuelve token
=======
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
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw Object.assign(new Error('Los campos email y password son obligatorios'), {
      statusCode: 400,
    });
  }

<<<<<<< HEAD
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
=======
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (User as any).findUserByCredentials(email, password);

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
};