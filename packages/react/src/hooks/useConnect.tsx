import { useConnect as useConnectWagmi } from 'wagmi';

/**
 * Hook for connecting to account with connectors.
 *
 * @example
 * ```tsx
 * const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
 * ```
 */
export function useConnect() {
  const connect = useConnectWagmi();

  return {
    ...connect,
  };
}
