import { Chains } from './chains';

interface FactoryContractData {
  [key: number]: {
    address: string;
  };
}

export const starFactoryContracts: FactoryContractData = {
  // Add the proper key-value pairs for each chainId
  //@TODO create deployed addresses package to get address from it.
  [Chains.polygon.id]: {
    address: '0xc0553B98d93114FB241196272603DF4543359820',
  },
  [Chains.polygonMumbai.id]: {
    address: '0xC9E9dbB9362d3A54E0E7E0489F0419AD81ec6326',
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

export const constellationFactoryContracts: FactoryContractData = {
  // Add the proper key-value pairs for each chainId
  //@TODO create deployed addresses package to get address from it.
  [Chains.polygon.id]: {
    address: '0xa3cCc90A2025cefad0AeDF4CFe44aD059605620c',
  },
  [Chains.polygonMumbai.id]: {
    address: '0x25605c37Bf5aD55D37F2c5fB5BDCadeB274395b3',
  },
  [Chains.aurora.id]: {
    address: '0xC4d53838f4D54f1A44116b3109BfA1bf064a8301',
  },
  [Chains.auroraTestnet.id]: {
    address: '0xA22eeFa2C34C8F1C547ADd3A6E8B6c8562E388aC',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  },
};
