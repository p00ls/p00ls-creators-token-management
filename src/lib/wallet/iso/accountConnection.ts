import {Address} from "../../domain";

export enum AccountConnectionStatus {
  Loading = 'Loading',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export interface ConnectedAccount {
  status: AccountConnectionStatus.Connected;
  address: Address;
  disconnect: () => Promise<void>;
}

export interface DisconnectedAccount {
  status: AccountConnectionStatus.Disconnected;
}

export interface LoadingAccount {
  status: AccountConnectionStatus.Loading;
}

export type AccountConnection =
  | ConnectedAccount
  | DisconnectedAccount
  | LoadingAccount;
