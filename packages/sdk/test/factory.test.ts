import { word } from 'casual';
import {
  Chains,
  ContractErrors,
  factoryContracts,
  OpenFormatSDK,
} from '../src';
import { PRIVATE_KEY } from './utilities';

describe('Factory', () => {
  let sdk: OpenFormatSDK;
  let walletAddress: string;

  beforeEach(async () => {
    sdk = new OpenFormatSDK({
      network: Chains.foundry,
      appId: '',
      signer: PRIVATE_KEY,
    });

    if (sdk.signer) {
      walletAddress = await sdk.signer?.getAddress();
    }
  });

  it('should return the factory address for localhost', async () => {
    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      factoryContracts[network.chainId].address
    );
  });

  it('should return the factory address for mumbai', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygonMumbai,
      appId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      factoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for polygon', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygon,
      appId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      factoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for aurora', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.aurora,
      appId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      factoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for aurora testnet', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.auroraTestnet,
      appId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      factoryContracts[network.chainId].address
    );
  });

  it('should create an app', async () => {
    const tx = await sdk.factory.create(word);
    expect(tx.status).toBe(1);
  });

  it('should throw error if app name already exists', async () => {
    const name = word;
    await sdk.factory.create(name);

    async function handleCreate() {
      await sdk.factory.create(name);
    }

    await expect(handleCreate).rejects.toThrow(
      ContractErrors.Factory_nameAlreadyUsed
    );
  });
});
