const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  const errorData = await res.json().catch(() => ({}));
  throw new Error(errorData.message || errorData.error || `Error: ${res.status}`);
};

export const register = async (email: string, password: string): Promise<void> => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  await checkResponse(res);
};

export const authorize = async (email: string, password: string): Promise<{ token: string }> => {
  const res = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse<{ token: string }>(res);
};