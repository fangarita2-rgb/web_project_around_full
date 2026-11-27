import type {
  CardData,
  CardFormData,
  UserData,
  UserFormData,
  AvatarFormData,
} from '../types/types';

interface ApiOptions {
  baseUrl: string;
<<<<<<< HEAD
=======
  headers: Record<string, string>;
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
}

class Api {
  private baseUrl: string;
<<<<<<< HEAD

  constructor({ baseUrl }: ApiOptions) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
=======
  private headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
    });
    return this.handleResponse<UserData>(res);
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this.baseUrl}/cards`, {
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
    });
    return this.handleResponse<CardData[]>(res);
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(res);
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(res);
  }

  async addCard(data: CardFormData): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
      body: JSON.stringify(data),
    });
    return this.handleResponse<CardData>(res);
  }

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
    });
    return this.handleResponse<void>(res);
  }

  async likeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
    });
    return this.handleResponse<CardData>(res);
  }

  async unlikeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
<<<<<<< HEAD
      headers: this.getHeaders(),
=======
      headers: this.headers,
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
    });
    return this.handleResponse<CardData>(res);
  }
}

export const api = new Api({
<<<<<<< HEAD
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  
=======
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
});