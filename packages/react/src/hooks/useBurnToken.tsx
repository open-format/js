import { ERC20Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint
 * @param {ERC20Base} token ERC20Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, burn } = useBurn(token);
 * ```
 *
 */
export function useBurnToken(token: ERC20Base) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof token.burn>>,
    unknown,
    Parameters<ERC20Base['burn']>[0]
  >(async (data) => {
    return await token.burn(data);
  });

  return {
    ...mutation,
    burn: mutateAsync,
  };
}
