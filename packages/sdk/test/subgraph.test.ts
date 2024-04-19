import { gql } from 'graphql-request';
import { Chains, OpenFormatSDK, Subgraphs } from '../src/index';

describe('subgraph', () => {
  it('should return subgraph endpoint for Arbitrum Sepolia', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.arbitrumSepolia,
      appId: global.app,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.arbitrumSepolia.id].url);
  });

  it('should return subgraph endpoint for Polygon Mainnet', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygon,
      appId: global.app,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.polygon.id].url);
  });

  it('should return subgraph endpoint for Foundry(localhost)', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      appId: global.app,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.foundry.id].url);
  });

  it('allows you to perform a raw request', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.arbitrumSepolia,
      appId: global.app,
    });

    const query = gql`
      {
        users {
          id
        }
      }
    `;

    const result = await sdk.subgraph.rawRequest(query);

    expect(typeof result.users[0].id).toBe('string');
  });
});
