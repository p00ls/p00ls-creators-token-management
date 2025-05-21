import {ApplicationError} from './applicationError';

export class IOError<TPayload = unknown> extends ApplicationError<TPayload> {
  constructor(message: string, payload?: TPayload, stack?: string) {
    super(message, payload, stack);
    this.statusCode = 500;
  }

  static from<TPayload>(error: Error, payload?: TPayload) {
    return new IOError(error.message, payload, error.stack);
  }
}
