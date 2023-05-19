import { useNetwork as useNetworkWagmi } from 'wagmi';

/**
 * Hook to get the wallet state
 *
 * @example
 * ```tsx
 * const { chain, chains } = useNetwork();
 * ```
 */
export function useNetwork() {
  const network = useNetworkWagmi();

  return {
    ...network,
  };
}
