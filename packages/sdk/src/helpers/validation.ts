import { BigNumber, ethers } from 'ethers';
import { PromiseOrValue } from '../contract-types/common';

export function validateWalletAndMetadata(
  wallet: PromiseOrValue<string>,
  url: string
) {
  validateWallet(wallet);
  validateMetadata(url);
}

export function validateWalletAndAmount(
  wallet: PromiseOrValue<string>,
  amount: any
) {
  validateWallet(wallet);
  validateBigNumber(amount);
}

export function validateWallets(wallets: PromiseOrValue<string>[]) {
  for (let i = 0; i < wallets.length; i++) {
    try {
      if (ethers.utils.isAddress(wallets[i] as string)) {
      }
      continue;
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

function validateMetadata(url: string) {
  if (!url.startsWith('ipfs://') && !url.startsWith('https://')) {
    throw new Error('Invalid metadata URL');
  }
}

export function validateBigNumber(amount: any) {
  try {
    if (BigNumber.from(amount)) return;
  } catch (e) {
    throw new Error(
      'Invalid amount. Please check you are passing a valid number'
    );
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
