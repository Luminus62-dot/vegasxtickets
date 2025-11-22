import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler.js';
import { eventsRouter } from './modules/events/routes.js';
import { authRouter } from './modules/auth/routes.js';
import { healthRouter } from './modules/health/routes.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/events', eventsRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/health', healthRouter);

  app.use('*', (_req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));
  app.use(errorHandler);

  return app;
};
