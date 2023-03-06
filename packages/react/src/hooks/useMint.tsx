import { ERC721Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint
 * @param {ERC721Instance} nft ERC721Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, mint } = useMint(nft);
 * ```
 *
 */
export function useMint(nft: ERC721Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.mint>>,
    unknown,
    Parameters<typeof nft.mint>[0]
  >(async (data) => {
    return await nft.mint(data);
  });

  return {
    ...mutation,
    mint: mutateAsync,
  };
}
