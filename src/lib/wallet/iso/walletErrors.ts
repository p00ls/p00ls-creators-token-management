import {RpcError} from 'viem';
import {BusinessError, Errors} from "../../tools";

export const WalletErrors = {
  businessFrom,
};

function businessFrom(error: unknown) {
  if (error instanceof RpcError) {
    return new BusinessError(`${error.shortMessage} (${error.code})`, {
      code: error.code,
    });
  }
  if (isWalletError(error)) {
    return new BusinessError(error.shortMessage);
  }
  return new BusinessError(Errors.errorify(error).message);
}

interface WalletError {
  shortMessage: string;
}

function isWalletError(error: unknown): error is WalletError {
  return typeof error === 'object' && error !== null && 'shortMessage' in error;
}
