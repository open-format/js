import { Chains, ContractType, OpenFormatSDK } from '../src';

const APP_ID = '';

describe('sdk', () => {
  it('should initialize the SDK on the polygon network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygon,
      appId: APP_ID,
    });

    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(137);
  });
  it('should initialize the SDK on the arbitrum sepolia network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.arbitrumSepolia,
      appId: APP_ID,
    });

    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(421614);
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
