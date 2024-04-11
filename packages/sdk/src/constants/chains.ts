import { aurora, auroraTestnet, Chain, foundry, polygon } from '@wagmi/chains';

//@dev custom polygonMumbai chain due to failing rpc urls
export const polygonMumbai = {
  id: 80_001,
  name: 'Polygon Mumbai',
  network: 'maticmum',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://polygon-mumbai.g.alchemy.com/v2'],
      webSocket: ['wss://polygon-mumbai.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://polygon-mumbai.infura.io/v3'],
      webSocket: ['wss://polygon-mumbai.infura.io/ws/v3'],
    },
    default: {
      http: ['https://polygon-testnet.public.blastapi.io'],
    },
    public: {
      http: ['https://polygon-testnet.public.blastapi.io'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
  testnet: true,
} as const satisfies Chain;

export const arbitrumSepolia = {
  id: 421_614,
  name: 'Arbitrum Sepolia',
  nativeCurrency: {
    name: 'Arbitrum Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rollup.arbitrum.io/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://sepolia.arbiscan.io',
      apiUrl: 'https://api-sepolia.arbiscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 81930,
    },
  },
  testnet: true,
};

export const polygonAmoy = {
  id: 80002,
  name: 'Polygon Amoy',
  network: 'amoy',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://polygon-amoy.g.alchemy.com/v2'],
      webSocket: ['wss://polygon-amoy.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://polygon-amoy.infura.io/v3'],
      webSocket: ['wss://polygon-amoy.infura.io/ws/v3'],
    },
    default: {
      http: ['https://rpc-amoy.polygon.technology'],
    },
    public: {
      http: ['https://rpc-amoy.polygon.technology'],
    },
  },
  blockExplorers: {
    default: {
      name: 'OkLink',
      url: 'https://www.oklink.com/amoy',
    },
  },
  testnet: true,
} as const satisfies Chain;

export const Chains = {
  aurora,
  auroraTestnet,
  foundry,
  polygon,
  polygonMumbai,
  arbitrumSepolia,
  polygonAmoy,
};
