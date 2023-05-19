import { ERC721Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to grant approvals for NFTs
 * @param {ERC721Base} nft ERC721Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, approve } = useApprove(nft);
 * ```
 *
 */
export function useApproveNFT(nft: ERC721Base) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.approve>>,
    unknown,
    Parameters<typeof nft.approve>[0]
  >(async (data) => {
    return await nft.approve(data);
  });

  return {
    ...mutation,
    approve: mutateAsync,
  };
}
