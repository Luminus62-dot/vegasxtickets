import { Router } from 'express';
import { pool } from '../../config/db.js';
import { AuthRepository } from './repository.js';
import { AuthService } from './service.js';

const repository = new AuthRepository(pool);
const service = new AuthService(repository);

export const authRouter = Router();

authRouter.post('/register', async (req, res, next) => {
  try {
    const result = await service.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const result = await service.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
