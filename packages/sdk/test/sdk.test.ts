import { OpenFormatSDK } from '../src';

describe('sdk', () => {
  it('allows to pass a network by name which creates a provider', async () => {
    const sdk = new OpenFormatSDK({ network: 'mumbai', appId: '123' });
    const network = await sdk.provider.getNetwork();

    expect(network.chainId).toBe(80001);
  });
});
