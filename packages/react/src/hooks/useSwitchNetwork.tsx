import { useSwitchNetwork as useSwitchNetworkWagmi } from 'wagmi';

/**
 * Hook to handle network switching
 *
 * @example
 * ```tsx
 * const { switchNetwork } = useSwitchNetwork();
 * ```
 */
export function useSwitchNetwork(...args: any) {
  const network = useSwitchNetworkWagmi(...args);

  return {
    ...network,
  };
}
