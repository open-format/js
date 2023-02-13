import { ERC721Instance } from '@openformat/sdk';
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
export function useMint(nft: ERC721Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.mint>>,
    unknown,
    Parameters<typeof nft.mint>[0]
  >((data) => {
    return nft.mint(data);
  });

  return {
    ...mutation,
    mint: mutateAsync,
  };
}
