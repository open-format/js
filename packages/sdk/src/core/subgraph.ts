import { gql, request, RequestDocument, Variables } from 'graphql-request';
import { AppResponse, ContractResponse } from '../types';

//@TODO: This needs to be updated depending on chain
const ENDPOINT = 'http://0.0.0.0:8000/subgraphs/name/open-format/mumbai';

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
  document: RequestDocument,
  variables?: V
) {
  return await request<T, V>(ENDPOINT, document, variables);
}

export async function getAppIdsByCreator({ creator }: { creator: string }) {
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

  return await request<AppResponse, { creator: string }>(ENDPOINT, query, {
    creator: creator,
  });
}

export async function getERC721ByCreator({
  appId,
  createdAt,
}: {
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
    ENDPOINT,
    query,
    {
      appId: appId,
      createdAt: createdAt,
    }
  );
}

export async function getERC721ByID({ id }: { id: string }) {
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

  return await request<ContractResponse, { id: string }>(ENDPOINT, query, {
    id,
  });
}
