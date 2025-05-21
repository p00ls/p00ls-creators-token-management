import {isAxiosError} from 'axios';
import {z, ZodError} from 'zod';
import {ApplicationError} from './applicationError';
import {BusinessError} from './businessError';
import {IOError} from './ioError';

export const Errors = {
  errorify,
  applicationFrom,
  applicationFromHttp,
  businessFrom,
  businessFromValidation,
  businessFromFirebase,
  ioFrom,
  ioFromValidation,
  trySync,
  tryAsync,
  extractCodeFromPayload,
};

function businessFrom(error: unknown): BusinessError {
  return BusinessError.from(errorify(error));
}

function businessFromValidation(error: unknown): BusinessError {
  return fromValidation(error, (error) => BusinessError.from(error));
}

const FirebaseErrorSchema = z.object({
  message: z.string(),
  code: z.string(),
});

function businessFromFirebase(error: unknown): BusinessError {
  const parsing = FirebaseErrorSchema.safeParse(error);
  return error instanceof Error &&
  error.name === 'FirebaseError' &&
  parsing.success
    ? new BusinessError(
      parsing.data.message,
      {
        code: parsing.data.code,
      },
      error.stack
    )
    : BusinessError.from(errorify(error));
}

function ioFrom(error: unknown): IOError {
  return IOError.from(errorify(error));
}

function ioFromValidation(error: unknown): IOError {
  return fromValidation(error, (error) => IOError.from(error));
}

function fromValidation<TError extends ApplicationError>(
  error: unknown,
  createError: (error: Error) => TError
) {
  if (error instanceof ZodError) {
    const errorObject = error.format();
    const newError = new Error(
      `Validation error: ${JSON.stringify(errorObject)}`
    );
    newError.stack = error.stack;
    return createError(newError);
  }
  return createError(errorify(error));
}

function applicationFrom(error: unknown): ApplicationError {
  if (error instanceof ApplicationError) {
    return error;
  }
  return IOError.from(errorify(error));
}

function applicationFromHttp(error: unknown): ApplicationError {
  if (
    isAxiosError(error) &&
    error.response !== undefined &&
    error.response.data !== undefined
  ) {
    const status = error.response.status;
    const applicationError =
      status >= 500
        ? IOError.from(error, error.response.data)
        : BusinessError.from(error, error.response.data);
    return applicationError.withStatusCode(status);
  }
  return ioFrom(error);
}

function errorify(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === 'string') {
    return new Error(error);
  }
  if (error instanceof Object && 'message' in error) {
    const innerMessage = `${error.message}`.replace(/^\[[\w_]+\]:\s*/, '');
    return new Error(innerMessage);
  }
  return new Error('unknown');
}

async function tryAsync<TResult>(
  func: () => Promise<TResult>,
  mapError: (error: unknown) => ApplicationError = Errors.ioFrom
) {
  try {
    return await func();
  } catch (error) {
    throw mapError(error);
  }
}

function trySync<TResult>(
  func: () => TResult,
  mapError: (error: unknown) => ApplicationError = Errors.ioFrom
) {
  try {
    return func();
  } catch (error) {
    throw mapError(error);
  }
}

const ErrorWithCodeInPayload = z.object({
  payload: z.object({code: z.string()}),
});

function extractCodeFromPayload(error: unknown): string | undefined {
  const parsing = ErrorWithCodeInPayload.safeParse(error);
  return parsing.success ? parsing.data.payload.code : undefined;
}
