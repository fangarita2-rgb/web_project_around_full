const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const register = async (email: string, password: string): Promise<void> => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error al registrar');
  }
};

export const authorize = async (email: string, password: string): Promise<{ token: string }> => {
  const res = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error al iniciar sesión');
  }
  return res.json();
};