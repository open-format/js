import { render, RenderOptions } from '@testing-library/react';
import { ethers } from 'ethers';
import React, { FC, ReactElement } from 'react';
import { OpenFormatProvider } from '../src/provider';
import * as constants from '../test/constants';

const signer = new ethers.Wallet(
  constants.PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider('http://localhost:8545')
);

const App: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OpenFormatProvider
      config={{
        network: 'localhost',
        appId: constants.APP_ID,
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
