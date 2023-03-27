import { ERC20Base } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to transfer tokens
 * @param {ERC20Base} token ERC721Base
 *
 * @example
 * ```tsx
 * const { data: transactionReceipt, transfer } = useTransfer(token);
 * ```
 *
 */
export function useTransferToken(token: ERC20Base) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof token.transfer>>,
    unknown,
    Parameters<typeof token.transfer>[0]
  >(async (data) => {
    return await token.transfer(data);
  });

  return {
    ...mutation,
    transfer: mutateAsync,
  };
}
