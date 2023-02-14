import { Chain, ChainConfig } from '../types';

// list of chains Open Format supports
export const Chains: {
  [chain in Chain]: ChainConfig;
} = Object.freeze({
  mainnet: {
    id: 'mainnet',
    chainId: 1,
    name: 'Polygon',
    token: 'MATIC',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com/',
    subgraph: '',
  },
  mumbai: {
    id: 'mumbai',
    chainId: 80001,
    name: 'Polygon Mumbai',
    token: 'MATIC',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com/',
    subgraph: 'https://api.thegraph.com/subgraphs/name/open-format/mumbai',
  },
  localhost: {
    id: 'localhost',
    chainId: 31337,
    name: 'Localhost',
    token: 'ETH',
    rpcUrl: 'http://127.0.0.1:8545',
    subgraph: 'http://0.0.0.0:8000/subgraphs/name/open-format/mumbai',
  },
});
