import { OpenFormatSDK } from '../src';
import { APP_ID, ERC721_CONTRACT_NAME } from './utilities';

describe('sdk', () => {
  it('initializes the SDK on the mumbai network', async () => {
    const sdk = new OpenFormatSDK({
      network: 'mumbai',
      appId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(80001);
  });

  it('initializes the SDK on a local network', async () => {
    const sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(31337);
  });

  it('throws an error if multiple contracts are found', async () => {
    const sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function getContract() {
      await sdk.getContract({
        name: ERC721_CONTRACT_NAME,
      });
    }
    await expect(getContract).rejects.toThrow();
  });

  it('throws an error if contract address is invalid', async () => {
    const sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
    });

    async function createInstance() {
      await sdk.getContract({ contractAddress: '0x' });
    }

    await expect(createInstance).rejects.toThrow('Invalid contract address');
  });
});
