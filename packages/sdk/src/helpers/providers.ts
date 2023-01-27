import { ethers, providers, Signer } from 'ethers';
import { Chains } from '../constants';
import { Chain } from '../types';

/**
 * Returns a network URL base on a chain e.g. 'mumbai' and allows for
 * custom URLs
 * @param chain
 * @returns a chain URL
 */
export function getProviderUrl(chain: Chain) {
  switch (chain) {
    case 'mainnet':
      return Chains.mainnet.rpcUrl;
    case 'mumbai':
      return Chains.mumbai.rpcUrl;
    case 'localhost':
      return Chains.localhost.rpcUrl;
    default:
      if (chain.startsWith('http')) {
        return chain as string;
      } else {
        throw new Error(`Couldn't get provider for '${chain}'`);
      }
  }
}

/**
 * Creates a new JsonRpcProvider based on a network URL
 * @param networkUrl
 * @returns a JsonRpcProvider with a given network
 */
export function getProviderFromUrl(networkUrl: string) {
  return new providers.JsonRpcProvider(networkUrl);
}

/**
 * Creates a signer from a private key or returns a signer if one is passed
 * @param signer
 * @param provider
 * @returns Signer
 */
export function getSigner(
  signer: Signer | string,
  provider?: providers.Provider
) {
  if (typeof signer === 'string') {
    if (!provider) {
      throw new Error(
        'To create a signer from a private key a provider must be passed'
      );
    }

    const privateKey = signer;
    return new ethers.Wallet(privateKey, provider);
  }

  return signer;
}
