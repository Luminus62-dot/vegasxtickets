import { Pool } from 'pg';

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
};

export class AuthRepository {
  constructor(private readonly pool: Pool) {}

  async findByEmail(email: string): Promise<UserRecord | null> {
    const result = await this.pool.query<UserRecord>(
      'SELECT id, email, password_hash as "passwordHash", role FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] ?? null;
  }

  async createUser(email: string, passwordHash: string): Promise<UserRecord> {
    const result = await this.pool.query<UserRecord>(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, password_hash as "passwordHash", role',
      [email, passwordHash]
    );
    return result.rows[0];
  }
}
