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
    address: '0x1e823247D26efd56f5172b8C19F6c44CA700F2c5',
  },
  [Chains.polygonMumbai.id]: {
    address: '0x429cB2c2A030952D3F5e10B534584aB49c303763',
  },
  [Chains.aurora.id]: {
    address: '0xc0553B98d93114FB241196272603DF4543359820',
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
    address: '0x0cE3fB93111Dee33cDB59f97e3df84e93adE46DD',
  },
  [Chains.polygonMumbai.id]: {
    address: '0x609401678A22F7e2c7AaFd817F6F5a0bbBf44e8F',
  },
  [Chains.aurora.id]: {
    address: '0xa3cCc90A2025cefad0AeDF4CFe44aD059605620c',
  },
  [Chains.auroraTestnet.id]: {
    address: '0xA22eeFa2C34C8F1C547ADd3A6E8B6c8562E388aC',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  },
};
