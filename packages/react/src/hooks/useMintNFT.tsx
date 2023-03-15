import { ERC721Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint an NFT
 * @param {ERC721Instance} nft ERC721Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, mint } = useMint(nft);
 * ```
 *
 */
export function useMintNFT(token: ERC721Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof token.mint>>,
    unknown,
    Parameters<typeof token.mint>[0]
  >(async (data) => {
    return await token.mint(data);
  });

  return {
    ...mutation,
    mint: mutateAsync,
  };
}
