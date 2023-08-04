import { ChainId, Chains } from '@openformat/sdk';

export const chainIdToNetwork = {
  [Chains.polygonMumbai.id]: Chains.polygonMumbai,
  [Chains.polygon.id]: Chains.polygon,
  [Chains.aurora.id]: Chains.aurora,
  [Chains.auroraTestnet.id]: Chains.auroraTestnet,
  [Chains.foundry.id]: Chains.foundry,
};

export const getNetworkByChainId = (chainId: ChainId) => {
  return chainIdToNetwork[chainId] ?? null;
};
