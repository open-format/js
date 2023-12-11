import { Chain } from '@thirdweb-dev/chains';
import { useChain as useChainTW } from '@thirdweb-dev/react';
import { useChainId as useChainIdTW } from '@thirdweb-dev/react';

/**
 * Hook to get the wallet state
 *
 * @example
 * ```tsx
 * const { network, chainId } = useChain();
 * ```
 */
export function useChain(): {
  network: Chain | undefined;
  chainId: number | undefined;
} {
  const network = useChainTW();
  const chainId = useChainIdTW();

  return {
    network,
    chainId,
  };
}
