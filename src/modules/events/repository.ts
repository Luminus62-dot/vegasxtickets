import { Pool } from 'pg';

export type EventRecord = {
  id: string;
  title: string;
  description: string;
  venue: string;
  startsAt: Date;
  imageUrl?: string;
  basePrice: number;
};

export class EventsRepository {
  constructor(private readonly pool: Pool) {}

  async findAll(): Promise<EventRecord[]> {
    const result = await this.pool.query<EventRecord>(
      'SELECT id, title, description, venue, starts_at as "startsAt", image_url as "imageUrl", base_price as "basePrice" FROM events ORDER BY starts_at ASC'
    );
    return result.rows;
  }

  async findById(id: string): Promise<EventRecord | null> {
    const result = await this.pool.query<EventRecord>(
      'SELECT id, title, description, venue, starts_at as "startsAt", image_url as "imageUrl", base_price as "basePrice" FROM events WHERE id = $1',
      [id]
    );
    return result.rows[0] ?? null;
  }
}
