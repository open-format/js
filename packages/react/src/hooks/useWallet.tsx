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
  // @todo pass the address
  const address = useAddress();
  const isConnected = !!address;

  console.log('Address SDK: ', address);
  console.log('isConnected SDK: ', isConnected);
  return { address, isConnected };
}
