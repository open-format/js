import { faker } from '@faker-js/faker';
import {
  appFactoryContracts,
  Chains,
  ContractErrors,
  OpenFormatSDK,
} from '../src';
import { PRIVATE_KEY } from './setup';

describe('AppFactory', () => {
  let sdk: OpenFormatSDK;
  it('should return the factory address for localhost', async () => {
    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getAppFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      appFactoryContracts[network.chainId].address
    );
  });

  it('should return the factory address for mumbai', async () => {
    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getAppFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      appFactoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for polygon', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygon,
      appId: '',
      signer: PRIVATE_KEY,
    });

    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getAppFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      appFactoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for aurora', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygon,
      appId: '',
      signer: PRIVATE_KEY,
    });

    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getAppFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      appFactoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for aurora testnet', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygon,
      appId: '',
      signer: PRIVATE_KEY,
    });

    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getAppFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      appFactoryContracts[network.chainId].address
    );
  });

  it('should create an app', async () => {
    const app = await global.sdk.factory.createApp({
      name: faker.internet.domainWord(),
    });

    expect(app.id).toContain('0x');
  });

  it('should throw error if app name already exists', async () => {
    const name = faker.internet.domainWord();

    await global.sdk.factory.createApp({ name });

    async function handleCreate() {
      await global.sdk.factory.createApp({ name });
    }

    await expect(handleCreate).rejects.toThrow(
      ContractErrors.App_nameAlreadyUsed
    );
  });
});
