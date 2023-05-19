import { BigNumber, ethers } from 'ethers';
import { PromiseOrValue } from '../contract-types/common';
import { toWei } from './transaction';

export function validateWalletAndMetadata(
  wallet: PromiseOrValue<string>,
  url: PromiseOrValue<string>
) {
  validateWallet(wallet);
  validateMetadata(url);
}

export function validateWalletAndAmount(
  wallet: PromiseOrValue<string>,
  amount: any
) {
  validateWallet(wallet);
  validateBigNumbers([amount]);
}

export function validateWallets(wallets: PromiseOrValue<string>[]) {
  for (let i = 0; i < wallets.length; i++) {
    try {
      if (ethers.utils.isAddress(wallets[i] as string)) continue;
    } catch (e) {
      throw new Error('Invalid wallet or contract address');
    }
  }
}

export function validateWallet(wallet: PromiseOrValue<string>) {
  if (!ethers.utils.isAddress(wallet as string)) {
    throw new Error('Invalid wallet or contract address');
  }
}

function validateMetadata(url: PromiseOrValue<string>) {
  if (
    !(url as string).startsWith('ipfs://') &&
    !(url as string).startsWith('https://')
  ) {
    throw new Error('Invalid metadata URL');
  }
}

export function validateBigNumbers(amount: any[]) {
  for (let i = 0; i < amount.length; i++) {
    try {
      if (BigNumber.from(amount[i])) continue;
    } catch (e) {
      throw new Error(
        'Invalid amount. Please check you are passing a valid number'
      );
    }
  }
}

export function address(addr: string) {
  return ethers.utils.getAddress(addr);
}
