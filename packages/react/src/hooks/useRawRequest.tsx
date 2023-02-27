import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useOpenFormat } from '../provider';

/**
 * Performs a custom query against the subgraph
 * @param {{ query: string }} options A GraphQL query
 * @returns {any} Data from the subgraph
 */
export function useRawRequest<TQueryFnData, TError, TData = TQueryFnData>({
  query: rawQuery,
  variables,
  config,
}: {
  query: string;
  variables?: {
    [key: string]: any;
  };
  config?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    'queryKey' | 'queryFn'
  >;
}): UseQueryResult<TData, TError> {
  const { sdk } = useOpenFormat();

  const query = useQuery(
    ['raw-request', rawQuery],
    () => sdk.subgraph.rawRequest(rawQuery, variables),
    config
  );

  return query;
}
