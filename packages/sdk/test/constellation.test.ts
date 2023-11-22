import { faker } from '@faker-js/faker';
import {
  Chains,
  ContractErrors,
  Errors,
  Factory,
  OpenFormatSDK,
  starFactoryContracts,
} from '../src';
import { mockLowFeeBalance } from './mocks/lowFeeBalance';
import { PRIVATE_KEY } from './setup';

describe('ConstellationFactory', () => {
  it('should return the ConstellationFactory address for localhost', async () => {
    const network = await global.sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getStarFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });

  it('should return the ConstellationFactory address for mumbai', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygonMumbai,
      starId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress =
      global.sdk.factory.getStarFactoryContractAddress(network.chainId);

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });
  it('should return the ConstellationFactory address for polygon', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygon,
      starId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getStarFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });
  it('should return the ConstellationFactory address for aurora', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.aurora,
      starId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getStarFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });
  it('should return the ConstellationFactory address for aurora testnet', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.auroraTestnet,
      starId: '',
      signer: PRIVATE_KEY,
    });

    const network = await sdk.provider.getNetwork();
    const foundryContractAddress = sdk.factory.getStarFactoryContractAddress(
      network.chainId
    );

    expect(foundryContractAddress).toBe(
      starFactoryContracts[network.chainId].address
    );
  });

  it('should create an constellation', async () => {
    const tx = await global.sdk.factory.createConstellation({
      name: faker.internet.domainWord(),
      symbol: faker.hacker.abbreviation(),
      decimals: 18,
      supply: 1000,
    });

    expect(tx.constellationAddress).toContain('0x');
  });

  it('should fail to create a Constellation when the account has insufficient funds for transaction fees and throw a low balance error', async () => {
    mockLowFeeBalance();

    const factoryInstance = new Factory(
      global.sdk.provider,
      '',
      global.sdk.signer
    );

    const params = {
      name: faker.internet.domainWord(),
      symbol: faker.hacker.abbreviation(),
      decimals: 18,
      supply: 1000,
    };

    await expect(factoryInstance.createConstellation(params)).rejects.toThrow(
      Errors.LowTransactionFeeBalance
    );
  });

  it('should throw error if app name already exists', async () => {
    const name = faker.internet.domainWord();

    const params = {
      symbol: faker.hacker.abbreviation(),
      decimals: 18,
      supply: 1000,
    };

    await global.sdk.factory.createConstellation({ name, ...params });

    async function handleCreate() {
      await global.sdk.factory.createConstellation({ name, ...params });
    }

    await expect(handleCreate).rejects.toThrow(
      ContractErrors.Constellation_NameAlreadyUsed
    );
  });
});
