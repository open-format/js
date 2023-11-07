import { useConnect as useConnectTW } from '@thirdweb-dev/react';

/**
 * Hook for connecting to account with connectors.
 *
 * @example
 * ```tsx
 * const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
 * ```
 */
export function useConnect() {
  const connect = useConnectTW();

  return {
    ...connect,
  };
}
