import { ERC20Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to mint
 * @param {ERC20Instance} token ERC20Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, burn } = useBurn(token);
 * ```
 *
 */
export function useBurnToken(token: ERC20Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof token.burn>>,
    unknown,
    Parameters<ERC20Instance['burn']>[0]
  >(async (data) => {
    return await token.burn(data);
  });

  return {
    ...mutation,
    burn: mutateAsync,
  };
}
