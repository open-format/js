import { Chains } from './chains';

interface ContractData {
  [key: number]: {
    address: string;
  };
}

export const appFactoryContracts: ContractData = {
  // Add the proper key-value pairs for each chainId
  [Chains.polygon.id]: {
    address: '0x1e823247D26efd56f5172b8C19F6c44CA700F2c5',
  },
  [Chains.polygonAmoy.id]: {
    address: '0x3713395bd3c11E4D5A688b21cFa3f86D04288861',
  },
  [Chains.arbitrumSepolia.id]: {
    address: '0x19781Af95cA4E113D5D1412452225D11A84ce992',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  },
};
