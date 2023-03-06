import { ERC721Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to batch mint
 * @param {ERC721Instance} nft ERC721Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, batchMint } = useBatchMint(nft);
 * ```
 *
 */
export function useBatchMint(nft: ERC721Instance) {
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
