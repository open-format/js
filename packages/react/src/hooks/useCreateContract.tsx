import { useMutation } from '@tanstack/react-query';
import { Overrides } from 'ethers';
import { useOpenFormat } from '../provider';

/**
 * Create a contract
 * @param {ContractType} type The type of contract you want to create e.g ContractType.ERC721
 * @example
 * ```tsx
 * const { data, create } = useCreateContract(ContractType.ERC721);
 * ```
 */

export function useCreateContract(
  type: ContractType,
  transactionArgs?: Overrides
) {
  const { sdk } = useOpenFormat();

  if (type === ContractType.ERC721) {
    const { mutateAsync, ...mutation } = useMutation<
      Awaited<ReturnType<typeof sdk.ERC721.create>>,
      unknown,
      Parameters<typeof sdk.ERC721.create>[0]
    >((data) => {
      return sdk.ERC721.create(data, transactionArgs);
    });

    return {
      ...mutation,
      create: mutateAsync,
    };
  } else {
    // @TODO: This will be ERC20 when ready
    const { mutateAsync, ...mutation } = useMutation<
      Awaited<ReturnType<typeof sdk.ERC721.create>>,
      unknown,
      Parameters<typeof sdk.ERC721.create>[0]
    >((data) => {
      return sdk.ERC721.create(data, transactionArgs);
    });

    return {
      ...mutation,
      create: mutateAsync,
    };
  }
}

export enum ContractType {
  ERC20,
  ERC721,
}
