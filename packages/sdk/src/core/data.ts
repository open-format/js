import { providers, Signer } from 'ethers';
import { gql, request, RequestDocument, Variables } from 'graphql-request';
import { fromWei } from '../helpers';
import { LeaderboardResponse } from '../types';
import { BaseContract } from './base';

/**
 * Creates a new Subgraph instance
 * @public
 */
export class Data extends BaseContract {
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

  async generateLeaderboard({ token }: { token: string }) {
    const endpoint = await this.getSubgraphEndpoint();

    const query = gql`
      query generateLeaderboard($token: String!) {
        fungibleTokenBalances(
          where: { token_: { id: $token } }
          orderBy: balance
          orderDirection: desc
        ) {
          balance
          user {
            id
          }
          updatedAt
        }
      }
    `;

    const res = await request<LeaderboardResponse, { token: string }>(
      endpoint,
      query,
      {
        token,
      }
    );

    return res.fungibleTokenBalances.map((item) => ({
      amount: Number(fromWei(item.balance)).toFixed(2),
      user: item.user.id,
    }));
  }
}
