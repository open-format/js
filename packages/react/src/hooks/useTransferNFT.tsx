import { ERC721Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to transfer tokens
 * @param {ERC721Base} nft ERC721Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, transfer } = useTransfer(nft);
 * ```
 *
 */
export function useTransferNFT(nft: ERC721Base) {
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
