import { Chains } from './chains';

interface SubgraphData {
  [key: number]: {
    url: string;
  };
}

export const Subgraphs: SubgraphData = {
  // Add the proper key-value pairs for each chainId
  [Chains.arbitrumSepolia.id]: {
    url: 'https://subgraph.satsuma-prod.com/7238a0e24f3c/openformat--330570/open-format-arbitrum-sepolia/api',
  },
  [Chains.foundry.id]: {
    url: 'http://0.0.0.0:8000/subgraphs/name/open-format/mumbai',
  },
};
