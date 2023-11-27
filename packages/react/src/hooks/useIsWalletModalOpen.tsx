import { useIsWalletModalOpen as useIsWalletModalOpenTW } from '@thirdweb-dev/react';

/**
 * Hook to get the wallet modal open state
 *
 * @example
 * ```tsx
 * const isWalletModalOpen = useIsWalletModalOpen();
 * ```
 */
export function useIsWalletModalOpen() {
  return useIsWalletModalOpenTW();
}
