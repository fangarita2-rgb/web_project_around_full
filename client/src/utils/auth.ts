export const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

export interface AuthRegisterResponse {
  data?: {
    email: string;
    _id: string;
  };
  message?: string;
  error?: string;
}

export interface AuthLoginResponse {
  token?: string;
  message?: string;
  error?: string;
}

export interface AuthCheckTokenResponse {
  data?: {
    _id: string;
    email: string;
  };
  message?: string;
  error?: string;
}

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  const errorData = await res.json().catch(() => ({}));
  throw new Error(errorData.message || errorData.error || `Error: ${res.status}`);
};

export const register = async (email: string, password: string): Promise<AuthRegisterResponse> => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse<AuthRegisterResponse>(res);
};

export const authorize = async (email: string, password: string): Promise<AuthLoginResponse> => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse<AuthLoginResponse>(res);
};

export const getContent = async (token: string): Promise<AuthCheckTokenResponse> => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse<AuthCheckTokenResponse>(res);
};