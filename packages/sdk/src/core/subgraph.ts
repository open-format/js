import { providers, Signer } from 'ethers';
import { gql, request, RequestDocument, Variables } from 'graphql-request';
import { AppResponse, ContractResponse } from '../types';
import { BaseContract } from './base';

/**
 * Creates a new Subgraph instance
 * @public
 */
export class Subgraph extends BaseContract {
  constructor(provider: providers.Provider, appId: string, signer?: Signer) {
    super(provider, appId, signer);
  }

  /**
   * Makes a raw request to the Open Format subgraph allowing you to pass your own
   * Query or Mutation
   * @param {RequestDocument} document a graphql query
   * @param {V} [variables] an optional object of query variables
   * @returns a result from the subgraph
   *
   * @example
   * ```
   * sdk.subgraph.rawRequest(gql`{ apps { id } }`)
   * ```
   */
  async rawRequest<T = any, V = Variables>(
    document: RequestDocument,
    variables?: V
  ) {
    const endpoint = await this.getSubgraphEndpoint();
    return await request<T, V>(endpoint, document, variables);
  }

  async getAppIdsByCreator({ creator }: { creator: string }) {
    const endpoint = await this.getSubgraphEndpoint();
    const query = gql`
      query getAppIdsByCreator($creator: String) {
        apps(
          where: { creator: $creator }
          orderBy: createdAt
          orderDirection: desc
        ) {
          id
        }
      }
    `;

    return await request<AppResponse, { creator: string }>(endpoint, query, {
      creator: creator,
    });
  }

  async getERC721ByTimestamp({
    appId,
    createdAt,
  }: {
    appId: string;
    createdAt: string;
  }) {
    const endpoint = await this.getSubgraphEndpoint();
    const query = gql`
      query getERC721ByTimestamp($appId: String!, $createdAt: String!) {
        contracts(
          where: { app: $appId, type: "ERC721", createdAt: $createdAt }
          orderBy: createdAt
          orderDirection: desc
        ) {
          id
          type
          createdAt
          creator
          app {
            id
          }
        }
      }
    `;

    return await request<
      ContractResponse,
      { appId: string; createdAt: string }
    >(endpoint, query, {
      appId: appId,
      createdAt: createdAt,
    });
  }

  async getERC721ByID({ id }: { id: string }) {
    const endpoint = await this.getSubgraphEndpoint();

    const query = gql`
      query getERC721ContractByApp($id: String!) {
        contracts(where: { id: $id, type: "ERC721" }) {
          id
          type
          createdAt
          creator
          app {
            id
          }
        }
      }
    `;

    return await request<ContractResponse, { id: string }>(endpoint, query, {
      id,
    });
  }
}
