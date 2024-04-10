import { Chains } from './chains';

interface ContractData {
  [key: number]: {
    address: string;
  };
}

export const starFactoryContracts: ContractData = {
  // Add the proper key-value pairs for each chainId
  [Chains.polygon.id]: {
    address: '0x1e823247D26efd56f5172b8C19F6c44CA700F2c5',
  },
  [Chains.polygonMumbai.id]: {
    address: '0x429cB2c2A030952D3F5e10B534584aB49c303763',
  },
  [Chains.polygonAmoy.id]: {
    address: '0x542D145f2c66CB9ac58447Fe141BFB12fea7C8bE',
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

export const constellationFactoryContracts: ContractData = {
  // Add the proper key-value pairs for each chainId
  [Chains.polygon.id]: {
    address: '0x0cE3fB93111Dee33cDB59f97e3df84e93adE46DD',
  },
  [Chains.polygonMumbai.id]: {
    address: '0x609401678A22F7e2c7AaFd817F6F5a0bbBf44e8F',
  },
  [Chains.polygonAmoy.id]: {
    address: '0x4cE72ceB49223A259FA1265Ba3a78484BbE8B889',
  },
  [Chains.aurora.id]: {
    address: '0xa3cCc90A2025cefad0AeDF4CFe44aD059605620c',
  },
  [Chains.auroraTestnet.id]: {
    address: '0xBCb1242c7354f2edaf16b6AAa961234C6431F597',
  },
  [Chains.foundry.id]: {
    //@dev this change depending on local blockchain.
    address: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  },
};

export const txFeeContractAddress: ContractData = {
  // Add the proper key-value pairs for each chainId
  // @TODO These values need to be updated once token is available on live networks
  [Chains.polygon.id]: {
    address: '0x746a330Add641444ADbFa3Cc969F433aA632504E',
  },
  [Chains.polygonMumbai.id]: {
    address: '0x746a330Add641444ADbFa3Cc969F433aA632504E',
  },
  [Chains.polygonAmoy.id]: {
    address: '0x746a330Add641444ADbFa3Cc969F433aA632504E',
  },
  [Chains.aurora.id]: {
    address: '0x746a330Add641444ADbFa3Cc969F433aA632504E',
  },
  [Chains.auroraTestnet.id]: {
    address: '0x746a330Add641444ADbFa3Cc969F433aA632504E',
  },
  [Chains.foundry.id]: {
    //@dev This value is mocked in the tests. Update it if testing locally.
    address: '0x123',
  },
};

export const TREASURY_ACCOUNT: string =
  '0x52CCc4794A94C35D90807B3E052bfdD42aE18c67';
