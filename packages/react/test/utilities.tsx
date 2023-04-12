import { Chains } from '@openformat/sdk';
import { render, RenderOptions } from '@testing-library/react';
import { ethers } from 'ethers';
import React, { FC, ReactElement } from 'react';
import { OpenFormatProvider } from '../src/provider';

export function address(addr: string) {
  return ethers.utils.getAddress(addr);
}

// @dev Testing requires a local ethereum node and subgraph to be running. These addresses are
// used in the tests.

// @todo setup Jest so a single utilities.tsx can be shared between all packages.

export const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
export const WALLET_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
export const WALLET_ADDRESS2 = address(
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
);
export const WALLET_ADDRESS3 = '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc';
export const APP_ID = address('0x32d41242c5108a47dccd549f3b622ceb3bbca9f0');
export const ERC721_CONTRACT_ADDRESS =
  '0x3132556eb2154debb342a297ae3195e4b9959e2e';
export const ERC721_CONTRACT_NAME = 'My collectionss';
export const ERC20_CONTRACT_ADDRESS =
  '0x299a8422690bf32ef28d6c892abde7f3932f8ad5';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const NFT_DROP_CONTRACT_ADDRESS =
  '0x0db5d154a014b80d3941c2198ba649d9fe922325';

const signer = new ethers.Wallet(
  PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider('http://localhost:8545')
);

const App: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OpenFormatProvider
      config={{
        networks: [Chains.foundry],
        appId: APP_ID,
        signer,
      }}
    >
      {children}
    </OpenFormatProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: App, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
