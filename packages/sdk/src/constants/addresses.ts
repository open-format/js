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
  [Chains.polygonMumbai.id]: {
    address: '0x429cB2c2A030952D3F5e10B534584aB49c303763',
  },
  [Chains.polygonAmoy.id]: {
    address: '0xeBe3AE63007C262c9705fD2aE52E8f7e6A479443',
  },
  [Chains.aurora.id]: {
    address: '0xc0553B98d93114FB241196272603DF4543359820',
  },
  [Chains.auroraTestnet.id]: {
    address: '0x4d9D07E924F9bC486d496CacFaf2Bd9C7bC4E22F',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  },
};
