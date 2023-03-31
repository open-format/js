import { ERC721Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to batch mint
 * @param {ERC721Base} nft ERC721Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, batchMint } = useBatchMint(nft);
 * ```
 *
 */
export function useBatchMint(nft: ERC721Base) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.batchMint>>,
    unknown,
    Parameters<typeof nft.batchMint>[0]
  >((data) => {
    return nft.batchMint(data);
  });

  return {
    ...mutation,
    batchMint: mutateAsync,
  };
}
