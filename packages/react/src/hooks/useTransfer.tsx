import { ERC721Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to transfer tokens
 * @param {ERC721Instance} nft ERC721Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, transfer } = useTransfer(nft);
 * ```
 *
 */
export function useTransfer(nft: ERC721Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.transfer>>,
    unknown,
    Parameters<typeof nft.transfer>[0]
  >(async (data) => {
    return await nft.transfer(data);
  });

  return {
    ...mutation,
    transfer: mutateAsync,
  };
}
