import { useSigner as useSignerTW } from '@thirdweb-dev/react';

/**
 * Hook to access the signer
 *
 * @example
 * ```tsx
 * const { data: signer, isError, isLoading } = useSigner()
 * ```
 */
export function useSigner() {
  const signer = useSignerTW();

  return {
    ...signer,
  };
}
