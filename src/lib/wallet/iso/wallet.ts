export enum WalletType {
  Rainbow = 'Rainbow',
  Coinbase = 'Coinbase',
  Trust = 'Trust',
  Metamask = 'Metamask',
  MetamaskMobile = 'MetamaskMobile',
  Injected = 'Injected',
  Other = 'Other',
}

export interface Wallet {
  type: WalletType;
  name: string;
  connectorId: string;
}
