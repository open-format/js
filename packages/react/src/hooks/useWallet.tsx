import {
  WalletInstance,
  useAddress as useAddressTW,
} from '@thirdweb-dev/react';
import { useWallet as useWalletTW } from '@thirdweb-dev/react';
import { useSetIsWalletModalOpen as useSetIsWalletModalOpenTW } from '@thirdweb-dev/react';
/**
 * Hook to get the wallet state
 *
 * @example
 * ```tsx
 * const { isConnected, wallet } = useWallet();
 * ```
 */
export function useWallet(): {
  address: string | undefined;
  isConnected: boolean;
  wallet: WalletInstance | undefined;
  useSetIsWalletModalOpen: (value: boolean) => void;
} {
  // @todo pass the address
  const address = useAddressTW();
  const isConnected = !!address;
  const wallet = useWalletTW();
  const useSetIsWalletModalOpen = useSetIsWalletModalOpenTW();
  return { address, isConnected, wallet, useSetIsWalletModalOpen };
}
