import type { Request, Response } from 'express';
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
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  if (!name || !about) {
    throw Object.assign(new Error('Los campos name y about son obligatorios'), { statusCode: 400 });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { name, about },
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
export const updateAvatar = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  if (!avatar) {
    throw Object.assign(new Error('El campo avatar es obligatorio'), { statusCode: 400 });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { avatar },
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