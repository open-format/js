import {
  arbitrum,
  arbitrumSepolia,
  aurora,
  base,
  foundry,
  matchain,
  type Chain as ViemChain,
} from 'viem/chains';

export const turboChain: ViemChain = {
  id: 1313161567,
  name: 'TurboChain',
  nativeCurrency: {
    name: 'TurboChain',
    symbol: 'TURBO',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-0x4e45415f.aurora-cloud.dev'],
    },
  },
  blockExplorers: {
    default: {
      name: 'TurboChain Explorer',
      url: 'https://explorer.turbo.aurora.dev',
    },
  },
};

export const openformat: ViemChain = {
  id: 1313161576,
  name: 'Open Format',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-0x4e454168.aurora-cloud.dev'],
    },
  },
  blockExplorers: {
    default: {
      name: 'OpenFormat Explorer',
      url: 'https://explorer.0x4e454168.aurora-cloud.dev',
    },
  },
};

export const Chains = {
  arbitrumSepolia,
  aurora,
  arbitrum,
  openformat,
  turboChain,
  base,
  foundry,
  matchain,
};
