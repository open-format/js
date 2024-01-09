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

export const hederaPreviewnet = {
  id: 297,
  name: 'Hedera PreviewNet',
  network: 'Hedera Previewnet',
  nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://previewnet.hashio.io/api'],
    },
    public: {
      http: ['https://previewnet.hashio.io/api'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'HashScan',
      url: 'https://hashscan.io/previewnet',
    },
    default: {
      name: 'HashScan',
      url: 'https://hashscan.io/previewnet',
    },
  },
  testnet: true,
} as const satisfies Chain;

export const hederaTestnet = {
  id: 296,
  name: 'Hedera TestNet',
  network: 'Hedera Testnet',
  nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet.hashio.io/api'],
    },
    public: {
      http: ['https://testnet.hashio.io/api'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'HashScan',
      url: 'https://hashscan.io/testnet',
    },
    default: {
      name: 'HashScan',
      url: 'https://hashscan.io/testnet',
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
  hederaTestnet,
  hederaPreviewnet,
};
