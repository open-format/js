import { ERC721Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint
 * @param {ERC721Instance} nft ERC721Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, burn } = useBurn(nft);
 * ```
 *
 */
export function useBurn(nft: ERC721Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof nft.burn>>,
    unknown,
    Parameters<ERC721Instance['burn']>[0]
  >(async (data) => {
    return await nft.burn(data);
  });

  return {
    ...mutation,
    burn: mutateAsync,
  };
}
