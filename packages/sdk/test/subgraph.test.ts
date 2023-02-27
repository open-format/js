import { gql } from 'graphql-request';
import { OpenFormatSDK } from '../src/index';

describe('subgraph', () => {
  it('allows you to perform a raw request', async () => {
    const sdk = new OpenFormatSDK({
      network: 'mumbai',
      appId: '0x05a3e6a34baffa74586a93f64b57cbd9a6383c23',
    });

    const query = gql`
      {
        apps {
          id
        }
      }
    `;

    const result = await sdk.subgraph.rawRequest(query);

    expect(typeof result.apps[0].id).toBe('string');
  });
});
