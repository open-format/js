import { useQuery } from '@tanstack/react-query';
import { useOpenFormat } from '../provider';

/**
 * Create a contract instance from it's address
 * @param {string} address Address of the contract
 * @returns {ERC721Instance}
 * @example 
 * ```jsx
  const contractAddress = "0x3a151f807ee4370ea173a051cb6ba0790ce10da7";
  const NFT = useContract(contractAddress);

  function mint() {
    if (NFT) {
      NFT.mint(params);
    }
  }
  ```
 */

export function useContract(address: string) {
  const { sdk } = useOpenFormat();
  const { data } = useQuery(['contract'], () =>
    sdk.ERC721.getContract(address)
  );

  return data;
}
