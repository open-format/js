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
    address: '0x6377Eb1b6339A558D243D68B0A58DA6aAc7A604F',
  },
  [Chains.polygonMumbai.id]: {
    address: '0xB1b681f8ddeC7265E54F2424b768E68D8A922a5a',
  },
  [Chains.aurora.id]: {
    address: '0xC4d53838f4D54f1A44116b3109BfA1bf064a8301',
  },
  [Chains.auroraTestnet.id]: {
    address: '0xA22eeFa2C34C8F1C547ADd3A6E8B6c8562E388aC',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  },
};
