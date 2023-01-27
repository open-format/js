import { useMutation } from '@tanstack/react-query';
import { Transaction } from 'ethers';
import { useOpenFormat } from '../provider';

/**
 * Hook to get the deploy function from the SDK
 *
 * @example
 * ```tsx
 * const { ...mutation, deploy } = useDeploy();
 * ```
 */
export function useCreateApp(transactionArgs?: Transaction) {
  const { sdk } = useOpenFormat();

  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<typeof sdk.createApp>>,
    unknown
  >(() => {
    return sdk.createApp(transactionArgs);
  });

  return {
    ...mutation,
    deploy: mutateAsync,
  };
}
