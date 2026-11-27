import type { Request, Response } from 'express';
import Card from '../models/card.js';

export const getCards = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const cards = await Card.find({ owner: userId }).sort({ createdAt: -1 });
  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  }));
  res.json(cardsWithIsLiked);
};

export const createCard = async (req: Request, res: Response): Promise<void> => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  if (!name || !link) {
    throw Object.assign(new Error('Los campos name y link son obligatorios'), { statusCode: 400 });
  }
  const card = await Card.create({ name, link, owner });
  res.status(201).json(card);
};

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?._id;
  const card = await Card.findById(id);
  if (!card) throw Object.assign(new Error('Tarjeta no encontrada'), { statusCode: 404 });
  if (card.owner.toString() !== userId) throw Object.assign(new Error('No autorizado'), { statusCode: 403 });
  await card.deleteOne();
  res.json({ message: 'Tarjeta eliminada' });
};

export const likeCard = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const card = await Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user?._id } }, { new: true });
  if (!card) throw Object.assign(new Error('Tarjeta no encontrada'), { statusCode: 404 });
  res.json(card);
};

export const dislikeCard = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const card = await Card.findByIdAndUpdate(id, { $pull: { likes: req.user?._id } }, { new: true });
  if (!card) throw Object.assign(new Error('Tarjeta no encontrada'), { statusCode: 404 });
  res.json(card);
};