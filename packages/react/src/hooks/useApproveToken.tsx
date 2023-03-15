import { ERC20Instance } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to grant approvals for tokens
 * @param {ERC20Instance} token ERC721Instance
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, approve } = useApproveToken(token);
 * ```
 *
 */
export function useApproveToken(token: ERC20Instance) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof token.approve>>,
    unknown,
    Parameters<typeof token.approve>[0]
  >(async (data) => {
    return await token.approve(data);
  });

  return {
    ...mutation,
    approve: mutateAsync,
  };
}
