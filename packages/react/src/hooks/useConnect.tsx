import { useConnect as useConnectWagmi } from 'wagmi';

/**
 * Hook for connecting to account with connectors.
 *
 * @example
 * ```tsx
 * const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
 * ```
 */
export function useConnect(...args: any) {
  const connect = useConnectWagmi(...args);

  return {
    ...connect,
  };
}
