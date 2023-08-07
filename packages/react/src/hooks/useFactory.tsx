import { Factory } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';
import { useOpenFormat } from '../provider';

/**
 * Create apps
 * @example
 * ```tsx
 * const { data, create } = useFactory();
 * ```
 */

export function useFactory() {
  const { sdk } = useOpenFormat();

  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<Factory['createStar']>>,
    unknown,
    Parameters<Factory['createStar']>[0]
  >((data) => {
    return sdk.factory.createStar(data);
  });

  return {
    ...mutation,
    create: mutateAsync,
  };
}
