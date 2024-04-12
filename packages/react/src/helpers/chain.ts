import { ChainId, Chains } from '@openformat/sdk';

export const chainIdToNetwork = {
  [Chains.foundry.id]: Chains.foundry,
  [Chains.arbitrumSepolia.id]: Chains.arbitrumSepolia,
};

export const getNetworkByChainId = (chainId: ChainId) => {
  // @ts-ignore
  return chainIdToNetwork[chainId] ?? null;
};
