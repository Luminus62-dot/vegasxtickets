import { Router } from 'express';
import { pool } from '../../config/db.js';
import { EventsRepository } from './repository.js';
import { EventsService } from './service.js';

const repository = new EventsRepository(pool);
const service = new EventsService(repository);

export const eventsRouter = Router();

eventsRouter.get('/', async (_req, res, next) => {
  try {
    const events = await service.getAll();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

eventsRouter.get('/:id', async (req, res, next) => {
  try {
    const event = await service.getById(req.params.id);
    res.json(event);
  } catch (error) {
    next(error);
  }
});
