import {ConnectedAccount, DisconnectedAccount, LoadingAccount, Signature, Wallet,} from '../iso';
import {BusinessError} from "../../tools";

export type ConnectToWallet = {
  connectToWallet: (wallet: Wallet) => void;
  error: BusinessError<unknown> | undefined;
};
export type DisconnectFromWallet = {
  disconnectFromWallet: () => void;
  disconnectFromWalletAsync: () => Promise<void>;
  error: Error | null;
};

export interface WalletFacade {
  connection: ConnectedAccount | DisconnectedAccount | LoadingAccount;
  connectToWallet: ConnectToWallet;
  disconnectFromWallet: DisconnectFromWallet;
  switchToNetwork: (network: number) => void;
  signMessage: (message: string) => Promise<Signature>;
  currentChainId?: number;
  wallets: Wallet[];
}

export type UseWallet = () => WalletFacade;
