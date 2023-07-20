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
      http: ['https://polygon-mumbai-bor.publicnode.com'],
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

export const Chains = {
  aurora,
  auroraTestnet,
  foundry,
  polygon,
  polygonMumbai,
};
