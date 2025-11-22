import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../../config/env.js';
import { HttpError } from '../../utils/http-error.js';
import { AuthRepository } from './repository.js';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async register(payload: unknown) {
    const { email, password } = credentialsSchema.parse(payload);

    const existing = await this.repository.findByEmail(email);
    if (existing) {
      throw new HttpError('El usuario ya existe', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.repository.createUser(email, passwordHash);
    const token = this.createToken(user.id, user.role);

    return { user: { id: user.id, email: user.email, role: user.role }, token };
  }

  async login(payload: unknown) {
    const { email, password } = credentialsSchema.parse(payload);
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new HttpError('Credenciales inválidas', 401);
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw new HttpError('Credenciales inválidas', 401);
    }

    const token = this.createToken(user.id, user.role);
    return { user: { id: user.id, email: user.email, role: user.role }, token };
  }

  private createToken(userId: string, role: string) {
    return jwt.sign({ sub: userId, role }, env.jwtSecret, { expiresIn: env.jwtExpiration });
  }
}
