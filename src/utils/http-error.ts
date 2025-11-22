export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number = 400,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
