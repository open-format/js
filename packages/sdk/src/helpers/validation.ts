import { ethers } from 'ethers';

export function validateWalletAndMetadata(wallet: string, url?: string) {
  if (!ethers.utils.isAddress(wallet)) {
    throw new Error('Invalid wallet or contract address');
  }

  if (url && !url.startsWith('ipfs://') && !url.startsWith('https://')) {
    throw new Error('Invalid metadata URL');
  }
}

export function address(addr: string) {
  return ethers.utils.getAddress(addr);
}
