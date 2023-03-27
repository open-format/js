import { ERC721Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint an NFT
 * @param {ERC721Base} nft ERC721Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, mint } = useMint(nft);
 * ```
 *
 */
export function useMintNFT(token: ERC721Base) {
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
