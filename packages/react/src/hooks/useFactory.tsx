import { Factory } from '@openformat/sdk';
import { useMutation } from '@tanstack/react-query';
import { Signer } from 'ethers';

export function useFactory(factoryAddress: string, signer: Signer | string) {
  const { mutateAsync, ...mutation } = useMutation<
    Awaited<ReturnType<Factory['create']>>,
    unknown,
    Parameters<Factory['create']>[0]
  >((data) => {
    const factory = new Factory({ signer, factoryAddress });
    return factory.create(data);
  });

  return {
    ...mutation,
    create: mutateAsync,
  };
}
