import { Factory } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';
import { useOpenFormat } from '../provider';

export function useFactory() {
  const { sdk } = useOpenFormat();

  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<Factory['create']>>,
    unknown,
    Parameters<Factory['create']>[0]
  >((data) => {
    return sdk.factory.create(data);
  });

  return {
    ...mutation,
    create: mutateAsync,
  };
}
