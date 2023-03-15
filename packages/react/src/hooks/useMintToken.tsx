import { ERC20Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint an ERC20 token
 * @param {ERC20Instance} token ERC20Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, mint } = useMint(token);
 * ```
 *
 */
export function useMintToken(token: ERC20Instance) {
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
