import { Chains, ContractType, OpenFormatSDK } from '../src';
import { APP_ID } from './utilities';

describe('sdk', () => {
  it('should initialize the SDK on the polygon network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygon,
      appId: APP_ID,
    });

    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(137);
  });
  it('should initialize the SDK on the mumbai network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygonMumbai,
      appId: APP_ID,
    });

    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(80001);
  });
  it('should initialize the SDK on the aurora network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.aurora,
      appId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(1313161554);
  });

  it('should initialize the SDK on the aurora testnet network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.auroraTestnet,
      appId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(1313161555);
  });

  it('should initialize the SDK on a local network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      appId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(31337);
  });

  it('should throw an error if contract address is invalid', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      appId: APP_ID,
    });

    async function createInstance() {
      await sdk.getContract({ contractAddress: '0x', type: ContractType.NFT });
    }

    await expect(createInstance).rejects.toThrow('Invalid contract address');
  });

  it('should update the star ID', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      appId: APP_ID,
    });

    sdk.setAppId('0x123');

    expect(sdk.appId).toBe('0x123');
  });
});
