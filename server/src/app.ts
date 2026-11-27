import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createUser } from './controllers/users.js';
import { login } from './controllers/auth.js';
import { signupLimiter, signinLimiter } from './middleware/rate-limiter.js';
import router from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

// Confía en el proxy de Vercel
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aroundb', {
    maxPoolSize: 10,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión', err));

// Ruta de estado — sin base de datos ni token
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Rutas abiertas con sus propios limitadores
app.post('/signup', signupLimiter, createUser);
app.post('/signin', signinLimiter, login);

// Rutas protegidas
app.use(router);

app.use((_req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});