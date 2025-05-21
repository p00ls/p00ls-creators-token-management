export class ApplicationError<TPayload = unknown> extends Error {
  public readonly payload: TPayload | undefined;
  public statusCode;

  constructor(message: string, payload?: TPayload, stack?: string) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.payload = payload;
    this.statusCode = 500;
    if (stack !== undefined) {
      this.stack = stack;
    }
  }

  withStatusCode(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }
}
