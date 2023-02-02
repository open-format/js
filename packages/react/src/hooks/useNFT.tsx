import { useOpenFormat } from '../provider';
/**
 * Hook to get the deploy function from the SDK
 *
 * @example
 * ```tsx
 * const { ...mutation, deploy } = useDeploy();
 * ```
 */
export function useNFT(address: string) {
  const { sdk } = useOpenFormat();
  return sdk.getNFT(address);
}
