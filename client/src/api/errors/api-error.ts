import { getErrorTitle } from '@/utils/error-title';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly title: string;

  constructor(message: string, statusCode: number, title?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.title = title ?? getErrorTitle(statusCode);
  }
}
