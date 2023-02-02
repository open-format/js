import { ERC721 } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint
 * @param {OpenFormatNFT} nft A deployed NFT instance
 *
 * @example
 * ```tsx
 * const { ...mutation, mint } = useMint(nft);
 * ```
 *
 */
export function useMint(nft: ERC721, to: string) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.mint>>,
    unknown
  >(() => {
    return nft.mint(to);
  });

  return {
    ...mutation,
    mint: mutateAsync,
  };
}
