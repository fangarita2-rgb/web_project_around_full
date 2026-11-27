import type {
  CardData,
  CardFormData,
  UserData,
  UserFormData,
  AvatarFormData,
} from '../types/types';

interface ApiOptions {
  baseUrl: string;
}

class Api {
  private baseUrl: string;

  constructor({ baseUrl }: ApiOptions) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<UserData>(res);
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this.baseUrl}/cards`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<CardData[]>(res);
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(res);
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(res);
  }

  async addCard(data: CardFormData): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<CardData>(res);
  }

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<void>(res);
  }

  async likeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.getHeaders(),
    });
    return this.handleResponse<CardData>(res);
  }

  async unlikeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<CardData>(res);
  }
}

export const api = new Api({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  
});