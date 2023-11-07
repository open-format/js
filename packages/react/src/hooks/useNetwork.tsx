import { useChain as useChainTW } from '@thirdweb-dev/react';

/**
 * Hook to get the wallet state
 *
 * @example
 * ```tsx
 * const { chain, chains } = useNetwork();
 * ```
 */
export function useNetwork() {
  const network = useChainTW();

  return {
    ...network,
  };
}
