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

  async getAppIdsByOwner({ owner }: { owner: string }) {
    const endpoint = await this.getSubgraphEndpoint();
    const query = gql`
      query getAppIdsByOwner($owner: String) {
        apps(
          where: { owner: $owner }
          orderBy: createdAt
          orderDirection: desc
        ) {
          id
        }
      }
    `;

    return await request<AppResponse, { owner: string }>(endpoint, query, {
      owner: owner,
    });
  }

  async getContractByTimestamp({
    appId,
    createdAt,
    type,
  }: {
    appId: string;
    createdAt: string;
    type: string;
  }) {
    const endpoint = await this.getSubgraphEndpoint();
    const query = gql`
      query getContractByTimestamp(
        $appId: String!
        $createdAt: String!
        $type: String!
      ) {
        contracts(
          where: { app: $appId, type: $type, createdAt: $createdAt }
          orderBy: createdAt
          orderDirection: desc
        ) {
          id
          type
          createdAt
          owner
          app {
            id
          }
        }
      }
    `;

    return await request<
      ContractResponse,
      { appId: string; createdAt: string; type: string }
    >(endpoint, query, {
      appId,
      createdAt,
      type,
    });
  }

  async getContractByAddressOrName({
    id = '',
    name = '',
    appId,
  }: {
    id: string;
    name: string;
    appId: string;
  }) {
    const endpoint = await this.getSubgraphEndpoint();

    const query = gql`
      query getContractByAddressOrName(
        $id: String!
        $name: String!
        $appId: String!
      ) {
        contracts(
          where: {
            or: [
              { id: $id, app_contains_nocase: $appId }
              { metadata_: { name: $name }, app_contains_nocase: $appId }
            ]
          }
        ) {
          id
          type
          createdAt
          metadata {
            name
          }
        }
      }
    `;

    return await request<
      ContractResponse,
      { id: string; name: string; appId: string }
    >(endpoint, query, {
      id,
      name,
      appId,
    });
  }
  async getERC721ByID({ id, name }: { id: string; name: string }) {
    const endpoint = await this.getSubgraphEndpoint();

    const query = gql`
      query getERC721ContractByApp($id: String, $name: String) {
        contracts(
          where: {
            or: [
              { id: $id, type: "ERC721" }
              { metadata_: { name: $name }, type: "ERC721" }
            ]
          }
        ) {
          id
          type
          createdAt
          metadata {
            name
          }
        }
      }
    `;

    return await request<ContractResponse, { id: string; name: string }>(
      endpoint,
      query,
      {
        id,
        name,
      }
    );
  }
}
