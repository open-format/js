import { Chains } from './chains';

interface FactoryContractData {
  [key: number]: {
    address: string;
  };
}

export const factoryContracts: FactoryContractData = {
  // Add the proper key-value pairs for each chainId
  //@TODO create deployed addresses package to get address from it.
  [Chains.polygon.id]: {
    address: '0x0a2DcA79a0FB77f706DF2af7541e00543393174D',
  },
  [Chains.polygonMumbai.id]: {
    address: '0x716fd6975bcbD388fE0c0d7919190EC4492B5703',
  },
  [Chains.aurora.id]: {
    address: '0x716fd6975bcbD388fE0c0d7919190EC4492B5703',
  },
  [Chains.auroraTestnet.id]: {
    address: '0xCf48E89B7C7f7cE520eAE3DE871d1ed5c242e1A4',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  },
};
