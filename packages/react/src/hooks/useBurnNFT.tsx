import { ERC721Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint
 * @param {ERC721Base} nft ERC721Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, burn } = useBurn(nft);
 * ```
 *
 */
export function useBurnNFT(nft: ERC721Base) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.burn>>,
    unknown,
    Parameters<ERC721Base['burn']>[0]
  >(async (data) => {
    return await nft.burn(data);
  });

  return {
    ...mutation,
    burn: mutateAsync,
  };
}
