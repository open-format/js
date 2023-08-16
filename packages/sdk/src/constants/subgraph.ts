import { Chains } from './chains';

interface SubgraphData {
  [key: number]: {
    url: string;
  };
}

export const Subgraphs: SubgraphData = {
  // Add the proper key-value pairs for each chainId
  [Chains.polygon.id]: {
    url: 'https://api.thegraph.com/subgraphs/name/open-format/polygon-v2',
  },
  [Chains.polygonMumbai.id]: {
    url: 'https://subgraphs.openformat.tech/subgraphs/name/open-format/mumbai',
  },
  [Chains.aurora.id]: {
    url: 'https://api.thegraph.com/subgraphs/name/open-format/aurora-v2',
  },
  [Chains.auroraTestnet.id]: {
    url: 'https://api.thegraph.com/subgraphs/name/open-format/aurora-testnet-v2',
  },
  [Chains.foundry.id]: {
    url: 'http://0.0.0.0:8000/subgraphs/name/open-format/mumbai',
  },
};
