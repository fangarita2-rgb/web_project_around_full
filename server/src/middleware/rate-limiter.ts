import rateLimit from 'express-rate-limit';

export const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10,
  message: { message: 'Demasiadas solicitudes de registro, intenta más tarde' },
});

export const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10,
  message: { message: 'Demasiados intentos de inicio de sesión, intenta más tarde' },
});