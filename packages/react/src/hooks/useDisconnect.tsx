import { useDisconnect as useDisconnectWagmi } from 'wagmi';

/**
 * Hook for disconnecting the connected account.
 *
 * @example
 * ```tsx
 * const { disconnect } = useDisconnect()
 * ```
 */
export function useDisconnect() {
  const disconnect = useDisconnectWagmi();

  return {
    ...disconnect,
  };
}
