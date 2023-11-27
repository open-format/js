import { useSetIsWalletModalOpen as useSetIsWalletModalOpenTW } from '@thirdweb-dev/react';

/**
 * Hook for setting the wallet modal to open
 *
 * @example
 * ```tsx
 * const setIsWalletModalOpen = useSetIsWalletModalOpen();
 * ```
 */
export function useSetIsWalletModalOpen() {
  return useSetIsWalletModalOpenTW();
}
