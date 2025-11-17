
export class AppError extends Error {
  constructor(message: string, public readonly status = 500) { super(message); }
}
export class ValidationError extends AppError { constructor(m: string) { super(m, 400); } }
export class ExternalServiceError extends AppError { constructor(m: string, public readonly cause?: any) { super(m, 502); } }
export class DomainError extends AppError { constructor(m: string) { super(m, 422); } }
