import { HttpError } from '../../utils/http-error.js';
import { EventsRepository } from './repository.js';

export class EventsService {
  constructor(private readonly repository: EventsRepository) {}

  getAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new HttpError('Evento no encontrado', 404);
    }
    return event;
  }
}
