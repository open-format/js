import { ERC20Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint ERC20 tokens
 * @param {ERC20Base} token ERC20Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, mint } = useMint(token);
 * ```
 *
 */
export function useMintToken(token: ERC20Base) {
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
