import { ERC721Instance } from '@openformat/sdk';
import '@testing-library/jest-dom';
import React from 'react';
import { useContract, useMintNFT, useTransferNFT } from '../src/hooks';
import {
  ERC721_CONTRACT_ADDRESS,
  render,
  screen,
  waitFor,
  WALLET_ADDRESS,
  WALLET_ADDRESS2,
} from './utilities';

function Transfer({ address }: { address: string }) {
  const { data: nft } = useContract(address);
  const { mint } = useMintNFT(nft as ERC721Instance);
  const { data, transfer } = useTransferNFT(nft as ERC721Instance);

  async function handleMintAndTransfer() {
    const tokenId = await (nft as ERC721Instance)?.nextTokenIdToMint();
    await mint({ to: WALLET_ADDRESS, tokenURI: 'ipfs://' });

    if (tokenId) {
      await transfer({ from: WALLET_ADDRESS, to: WALLET_ADDRESS2, tokenId });
    }
  }

  return (
    <>
      {nft && (
        <>
          <button onClick={handleMintAndTransfer} data-testid="transfer">
            Transfer
          </button>
          {data && <span data-testid="receipt">{data.status}</span>}
        </>
      )}
    </>
  );
}

describe('useTransfer()', () => {
  it('transfers a given token', async () => {
    render(<Transfer address={ERC721_CONTRACT_ADDRESS} />);
    const transferButton = await waitFor(() => screen.getByTestId('transfer'));
    transferButton.click();

    const receipt = await waitFor(() => screen.getByTestId('receipt'));
    expect(receipt).toHaveTextContent('1');
  });
});
