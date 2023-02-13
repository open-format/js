import { useQuery } from '@tanstack/react-query';
import { useOpenFormat } from '../provider';

export function useNFT(address: string) {
  const { sdk } = useOpenFormat();
  const { data } = useQuery(['nft'], () => sdk.ERC721.getNFT(address));

  return data;
}
