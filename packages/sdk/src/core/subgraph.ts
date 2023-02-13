import { gql, request, RequestDocument, Variables } from 'graphql-request';
import { AppResponse, ContractResponse } from '../types';

/**
 * Makes a raw request to the Open Format subgraph allowing you to pass your own
 * Query or Mutation
 * @param document
 * @returns a result from the subgraph
 *
 * @example
 * ```
 * rawRequest(gql`{ apps { id } }`)
 * ```
 */
export async function rawRequest<T = any, V = Variables>(
  endpoint: string,
  document: RequestDocument,
  variables?: V
) {
  return await request<T, V>(endpoint, document, variables);
}

export async function getAppIdsByCreator({
  endpoint,
  creator,
}: {
  endpoint: string;
  creator: string;
}) {
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

export async function getERC721ByCreator({
  endpoint,
  appId,
  createdAt,
}: {
  endpoint: string;
  appId: string;
  createdAt: string;
}) {
  const query = gql`
    query getERC721ContractByApp($appId: String!, $createdAt: String!) {
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

  return await request<ContractResponse, { appId: string; createdAt: string }>(
    endpoint,
    query,
    {
      appId: appId,
      createdAt: createdAt,
    }
  );
}

export async function getERC721ByID({
  endpoint,
  id,
}: {
  endpoint: string;
  id: string;
}) {
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
