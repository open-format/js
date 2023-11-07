import { useAddress } from '@thirdweb-dev/react';
/**
 * Hook to get the wallet state
 *
 * @example
 * ```tsx
 * const { isConnected, wallet } = useWallet();
 * ```
 */
export function useWallet() {
  const account = useAddress();

  return account;
}
