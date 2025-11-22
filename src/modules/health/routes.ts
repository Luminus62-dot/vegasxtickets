import { Router } from 'express';
import { healthCheck } from '../../config/db.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res, next) => {
  try {
    await healthCheck();
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});
