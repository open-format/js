import { useQuery } from '@tanstack/react-query';
import { useOpenFormat } from '../provider';

export function useContract(address: string) {
  const { sdk } = useOpenFormat();
  const { data } = useQuery(['contract'], () =>
    sdk.ERC721.getContract(address)
  );

  return data;
}
