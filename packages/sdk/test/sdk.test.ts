import { Chains, ContractType, OpenFormatSDK } from '../src';
import { APP_ID } from './utilities';

describe('sdk', () => {
  it('should initialize the SDK on the polygon network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygon,
      starId: APP_ID,
    });

    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(137);
  });
  it('should initialize the SDK on the mumbai network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygonMumbai,
      starId: APP_ID,
    });

    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(80001);
  });
  it('should initialize the SDK on the aurora network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.aurora,
      starId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(1313161554);
  });

  it('should initialize the SDK on the aurora testnet network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.auroraTestnet,
      starId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(1313161555);
  });

  it('should initialize the SDK on a local network', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      starId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(31337);
  });

  it('should throw an error if contract address is invalid', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      starId: APP_ID,
    });

    async function createInstance() {
      await sdk.getContract({ contractAddress: '0x', type: ContractType.NFT });
    }

    await expect(createInstance).rejects.toThrow('Invalid contract address');
  });

  it('should update the star ID', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      starId: APP_ID,
    });

    sdk.setStarId('0x123');

    expect(sdk.appId).toBe('0x123');
  });
});
