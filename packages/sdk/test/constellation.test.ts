import { faker } from '@faker-js/faker';
import {
  Chains,
  ContractErrors,
  OpenFormatSDK,
  starFactoryContracts,
} from '../src';
import { PRIVATE_KEY } from './setup';

describe.only('ConstellationFactory', () => {
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
