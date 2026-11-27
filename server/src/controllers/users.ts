import type { Request, Response } from 'express';
<<<<<<< HEAD
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// GET /users — lista todos los usuarios (sin email)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find({});
  res.json(
    users.map((u) => ({
      _id: u._id,
      name: u.name,
      about: u.about,
      avatar: u.avatar,
    }))
  );
};

// GET /users/me — usuario autenticado (con email)
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const user = await User.findById(userId);
  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), { statusCode: 404 });
  }
  res.json({
    _id: user._id,
    email: user.email,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  });
};

// GET /users/:id — usuario por id (sin email)
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), { statusCode: 404 });
  }
  res.json({
    _id: user._id,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  });
};

// POST /signup — crear usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, about, avatar } = req.body;

  if (!email || !password) {
    throw Object.assign(new Error('Email y contraseña son obligatorios'), { statusCode: 400 });
  }
  if (password.length < 8) {
    throw Object.assign(new Error('La contraseña debe tener al menos 8 caracteres'), { statusCode: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword, name, about, avatar });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw Object.assign(new Error('Ya existe un usuario con ese correo'), { statusCode: 409 });
    }
    throw err;
  }
};

// PATCH /users/me — actualiza perfil (con email)
=======
import User from '../models/user.js';

// GET /users — Devuelve todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find({});
  res.json(users);
};

// GET /users/me — Devuelve el usuario actual
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;

  if (!userId) {
    throw Object.assign(new Error('No autorizado: ID de usuario no presente'), {
      statusCode: 401,
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    throw Object.assign(new Error('No se encontró el usuario actual'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

// GET /users/:id — Devuelve un usuario por su _id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

// POST /users — Crea un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    throw Object.assign(new Error('Los campos name, about y avatar son obligatorios'), {
      statusCode: 400,
    });
  }

  const user = await User.create({ name, about, avatar });
  res.status(201).json(user);
};

// PATCH /users/me — Actualiza el perfil del usuario actual
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  if (!name || !about) {
<<<<<<< HEAD
    throw Object.assign(new Error('Los campos name y about son obligatorios'), { statusCode: 400 });
=======
    throw Object.assign(new Error('Los campos name y about son obligatorios'), {
      statusCode: 400,
    });
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { name, about },
<<<<<<< HEAD
    { new: true, runValidators: true }
  );

  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), { statusCode: 404 });
  }

  res.json({
    _id: user._id,
    email: user.email,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  });
};

// PATCH /users/me/avatar — actualiza avatar (con email)
=======
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(new Error('No se encontró el usuario actual'), {
      statusCode: 404,
    });
  }

  res.json(user);
};

// PATCH /users/me/avatar — Actualiza el avatar del usuario actual
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
export const updateAvatar = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  if (!avatar) {
<<<<<<< HEAD
    throw Object.assign(new Error('El campo avatar es obligatorio'), { statusCode: 400 });
=======
    throw Object.assign(new Error('El campo avatar es obligatorio'), {
      statusCode: 400,
    });
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { avatar },
<<<<<<< HEAD
    { new: true, runValidators: true }
  );

  if (!user) {
    throw Object.assign(new Error('Usuario no encontrado'), { statusCode: 404 });
  }

  res.json({
    _id: user._id,
    email: user.email,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  });
=======
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(new Error('No se encontró el usuario actual'), {
      statusCode: 404,
    });
  }

  res.json(user);
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
};