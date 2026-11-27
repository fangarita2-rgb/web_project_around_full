import type React from 'react';

export type PopupConfig = {
  title?: string;
  children: React.ReactNode;
};

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
<<<<<<< HEAD
  email: string;
=======
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
}

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (data: UserFormData) => void;
  handleUpdateAvatar: (data: AvatarFormData) => void;
  handleAddPlaceSubmit: (data: CardFormData) => void;
}

export interface CardFormData {
  name: string;
  link: string;
}

export interface UserFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
}