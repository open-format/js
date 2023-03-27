import { ERC721Base } from '@openformat/sdk';
import '@testing-library/jest-dom';
import React from 'react';
import { useBurnNFT, useContract, useMintNFT } from '../src/hooks';
import {
  ERC721_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
} from './utilities';

function Burn({ address }: { address: string }) {
  const { data: nft } = useContract(address);
  const { mint } = useMintNFT(nft as ERC721Base);
  const { data, burn } = useBurnNFT(nft as ERC721Base);

  async function handleMintAndBurn() {
    const tokenId = await (nft as ERC721Base)?.nextTokenIdToMint();
    await mint({ to: WALLET_ADDRESS, tokenURI: 'ipfs://' });

    if (tokenId) {
      await burn({ tokenId });
    }
  }

  return (
    <>
      {nft && (
        <>
          <button onClick={handleMintAndBurn} data-testid="burn">
            Burn
          </button>
          {data && <span data-testid="receipt">{data.status}</span>}
        </>
      )}
    </>
  );
}

describe('useBurn()', () => {
  it('burns a given token', async () => {
    render(<Burn address={ERC721_CONTRACT_ADDRESS} />);
    const burnButton = await waitFor(() => screen.getByTestId('burn'));
    burnButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
