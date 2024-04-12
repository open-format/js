import { ethers, providers, Signer } from 'ethers';
import { Chains, Subgraphs } from '../constants';
import { ChainId } from '../types';

//@TODO: comment
export function getSubgraphUrlFromChainID(chainId: ChainId) {
  switch (chainId) {
    case Chains.polygon.id:
      return Subgraphs[Chains.polygon.id].url;
    case Chains.polygonAmoy.id:
      return Subgraphs[Chains.polygonAmoy.id].url;
    case Chains.arbitrumSepolia.id:
      return Subgraphs[Chains.arbitrumSepolia.id].url;
    case Chains.foundry.id:
      return Subgraphs[Chains.foundry.id].url;
    default:
      throw new Error(`Couldn't get subgraph URL for '${chainId}'`);
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
