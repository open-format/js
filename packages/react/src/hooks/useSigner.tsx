import { useSigner as useSignerWagmi } from 'wagmi';

/**
 * Hook to access the signer
 *
 * @example
 * ```tsx
 * const { data: signer, isError, isLoading } = useSigner()
 * ```
 */
export function useSigner() {
  const signer = useSignerWagmi();

  return {
    ...signer,
  };
}
