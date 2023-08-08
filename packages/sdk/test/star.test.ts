import { faker } from '@faker-js/faker';
import {
  Chains,
  ContractErrors,
  OpenFormatSDK,
  starFactoryContracts,
} from '../src';
import { PRIVATE_KEY } from './setup';

describe('StarFactory', () => {
  let sdk: OpenFormatSDK;
  it('should return the factory address for localhost', async () => {
    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getStarFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });

  it('should return the factory address for mumbai', async () => {
    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getStarFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for polygon', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygon,
      starId: '',
      signer: PRIVATE_KEY,
    });

    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getStarFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for aurora', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygon,
      starId: '',
      signer: PRIVATE_KEY,
    });

    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getStarFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });
  it('should return the factory address for aurora testnet', async () => {
    sdk = new OpenFormatSDK({
      network: Chains.polygon,
      starId: '',
      signer: PRIVATE_KEY,
    });

    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getStarFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });

  it('should create an app', async () => {
    const tx = await global.sdk.factory.createStar({
      name: faker.internet.domainWord(),
      constellation: global.constellation,
      owner: global.walletAddress,
    });

    expect(tx.starAddress).toContain('0x');
  });

  it('should throw error if app name already exists', async () => {
    const name = faker.internet.domainWord();
    const params = {
      constellation: global.constellation,
      owner: global.walletAddress,
    };

    await global.sdk.factory.createStar({ name, ...params });

    async function handleCreate() {
      await global.sdk.factory.createStar({ name, ...params });
    }

    await expect(handleCreate).rejects.toThrow(
      ContractErrors.Factory_nameAlreadyUsed
    );
  });
});
