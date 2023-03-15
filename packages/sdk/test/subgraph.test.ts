import { gql } from 'graphql-request';
import { OpenFormatSDK } from '../src/index';
import { APP_ID } from './utilities';
describe('subgraph', () => {
  it('allows you to perform a raw request', async () => {
    const sdk = new OpenFormatSDK({
      network: 'localhost',
      appId: APP_ID,
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
