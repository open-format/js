import { OpenFormatSDK } from '../src';

describe('sdk', () => {
  it('initializes the SDK on the mumbai network', async () => {
    const sdk = new OpenFormatSDK({
      network: 'mumbai',
      appId: '0x1ade2613adb6bafbc65d40eb9c1effbe3bfd8b81',
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(80001);
  });

  it('initializes the SDK on a local network', async () => {
    const sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: '0x1ade2613adb6bafbc65d40eb9c1effbe3bfd8b81',
    });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(31337);
  });
});
