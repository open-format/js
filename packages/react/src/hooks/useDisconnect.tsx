import { useDisconnect as useDisconnectTW } from '@thirdweb-dev/react';

/**
 * Hook for disconnecting the connected account.
 *
 * @example
 * ```tsx
 * const { disconnect } = useDisconnect()
 * ```
 */
export function useDisconnect() {
  const disconnect = useDisconnectTW();

  //console.log('Disconnect SDK', disconnect);
  return disconnect;
}
