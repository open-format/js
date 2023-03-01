import { ERC721Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to grant approvals for tokens
 * @param {ERC721Instance} nft ERC721Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, approve } = useApprove(nft);
 * ```
 *
 */
export function useApprove(nft: ERC721Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.approve>>,
    unknown,
    Parameters<typeof nft.approve>[0]
  >((data) => {
    return nft.approve(data);
  });

  return {
    ...mutation,
    approve: mutateAsync,
  };
}
