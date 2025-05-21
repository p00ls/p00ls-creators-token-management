import {ApplicationError} from './applicationError';

export class BusinessError<
  TPayload = unknown
> extends ApplicationError<TPayload> {
  constructor(message: string, payload?: TPayload, stack?: string) {
    super(message, payload, stack);
    this.statusCode = 400;
  }

  static from<TPayload>(error: Error, payload?: TPayload) {
    return new BusinessError(error.message, payload, error.stack);
  }
}
