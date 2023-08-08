import { gql } from 'graphql-request';
import { Chains, OpenFormatSDK, Subgraphs } from '../src/index';

describe('subgraph', () => {
  it('should return subgraph endpoint for Polygon Mumbai', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygonMumbai,
      starId: global.star,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.polygonMumbai.id].url);
  });

  it('should return subgraph endpoint for Polygon Mainnet', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygon,
      starId: global.star,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.polygon.id].url);
  });
  it('should return subgraph endpoint for Aurora', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.aurora,
      starId: global.star,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.aurora.id].url);
  });

  it('should return subgraph endpoint for Aurora testnet', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.auroraTestnet,
      starId: global.star,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.auroraTestnet.id].url);
  });
  it('should return subgraph endpoint for Foundry(localhost)', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.foundry,
      starId: global.star,
    });

    const endpoint = await sdk.getSubgraphEndpoint();

    expect(endpoint).toBe(Subgraphs[Chains.foundry.id].url);
  });

  it('allows you to perform a raw request', async () => {
    const sdk = new OpenFormatSDK({
      network: Chains.polygonMumbai,
      starId: global.star,
    });

    const query = gql`
      {
        constellations {
          id
        }
      }
    `;

    const result = await sdk.subgraph.rawRequest(query);

    expect(typeof result.constellations[0].id).toBe('string');
  });
});
