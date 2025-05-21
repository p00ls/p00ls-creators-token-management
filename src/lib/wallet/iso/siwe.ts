import {addSeconds} from 'date-fns';
import {SiweMessage} from 'siwe';
import {getAddress} from 'viem';

export interface SiweMessageCreation {
  statement: string;
  domain: string;
  uri: string;
  addressHex: string;
  chainId: number;
  nonce?: string;
  durationInSeconds: number;
}

export interface CreateSiweMessageOptions {
  createDate: () => Date;
}

export type CreateSiweMessage = (creation: SiweMessageCreation) => SiweMessage;

export function makeCreateSiweMessage(
  options: CreateSiweMessageOptions
): CreateSiweMessage {
  const {createDate} = options;
  return createSiweMessage;

  function createSiweMessage(creation: SiweMessageCreation): SiweMessage {
    const {
      domain,
      uri,
      statement,
      addressHex,
      chainId,
      nonce,
      durationInSeconds,
    } = creation;
    const currentDate = createDate();
    return new SiweMessage({
      statement,
      domain,
      uri,
      address: getAddress(addressHex),
      issuedAt: currentDate.toISOString(),
      expirationTime: addSeconds(currentDate, durationInSeconds).toISOString(),
      chainId,
      nonce,
      version: '1',
    });
  }
}
