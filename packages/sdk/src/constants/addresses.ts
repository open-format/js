import { Chains } from './chains';

interface ContractData {
  [key: number]: {
    address: string;
  };
}

export const appFactoryContracts: ContractData = {
  // Add the proper key-value pairs for each chainId
  [Chains.arbitrumSepolia.id]: {
    address: '0x19781Af95cA4E113D5D1412452225D11A84ce992',
  },
  [Chains.arbitrum.id]: {
    address: '0x1F36176c0874686d6d480a90Ca039e789c7f7Fa3',
  },
  [Chains.base.id]: {
    address: '0x2d6f1620b263Ce71862Fa95f6fEAbB6A366478cC',
  },
  [Chains.aurora.id]: {
    address: '0x2eBF7f4572c218217ca01CE2883E3EfF93626a8E',
  },
  [Chains.turboChain.id]: {
    address: '0x7e405FbA4c29B8B05B5ecF97bA664729C34803B8',
  },
  [Chains.matchain.id]: {
    address: '0xf1811D1D6D9a718312c3c9466D8c4a2601f973e7',
  },
  [Chains.openformat.id]: {
    address: '0x20A9FB49618a10fD7ea79C82ac4e6D9345CB4C97',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  },
};
