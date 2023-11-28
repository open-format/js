import { useSwitchChain as useSwitchChainTW } from '@thirdweb-dev/react';

/**
 * Hook to handle network switching
 *
 * @example
 * ```tsx
 * const { switchNetwork } = useSwitchNetwork();
 * ```
 */
export function useSwitchNetwork() {
  const network = useSwitchChainTW();
  return {
    ...network,
  };
}
