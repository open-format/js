import { Chains, OpenFormatSDK } from '@openformat/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Chain } from '@wagmi/chains';
import { ConnectKitProvider } from 'connectkit';
import { Signer } from 'ethers';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import {
  Connector,
  useConnect,
  useNetwork,
  useSigner,
  WagmiConfig,
} from 'wagmi';
import { getNetworkByChainId } from './helpers';
import { wagmiClient } from './wagmi-client';

const OpenFormatContext = createContext<{ sdk: OpenFormatSDK } | undefined>(
  undefined
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * The Provider for the Open Format SDK
 */
export function OpenFormatProvider({
  children,
  config = {
    networks: [Chains.polygonMumbai],
    appId: '',
  },
}: {
  children: React.ReactNode;
  config?: {
    networks: Chain[];
    appId: string;
    signer?: Signer | string;
  };
}) {
  return (
    <WagmiConfig client={wagmiClient(config.networks)}>
      <InnerProvider config={config}>{children}</InnerProvider>
    </WagmiConfig>
  );
}

function InnerProvider({
  children,
  config = {
    networks: [Chains.polygonMumbai],
    appId: '',
  },
}: {
  children: React.ReactNode;
  config?: {
    networks: Chain[];
    appId: string;
    signer?: Signer | string;
  };
}) {
  const { connect, connectors } = useConnect();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const network = getNetworkByChainId(chain?.id);

  const sdk = useMemo(() => {
    return new OpenFormatSDK({
      signer: signer as Signer,
      ...config,
      //@dev first network in the array of networks is the classed as the default chain.
      network: network ?? config.networks?.[0],
    });
  }, [signer, chain]);

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem('wagmi.wallet') ?? '""');
    const previouslyConnected = JSON.parse(
      localStorage.getItem('wagmi.connected') ?? 'false'
    );

    const connector = connectors.find(
      (connector: Connector) => wallet === connector.id
    );

    if (wallet && previouslyConnected) {
      connect({ connector });
    }
  }, []);

  return (
    <OpenFormatContext.Provider value={{ sdk: sdk }}>
      <ConnectKitProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConnectKitProvider>
    </OpenFormatContext.Provider>
  );
}

/**
 * Gets the Open Format Context
 * @returns the open format context
 * @private
 */
export function useOpenFormat() {
  const context = useContext(OpenFormatContext);

  if (typeof context === 'undefined') {
    throw new Error('<OpenFormatProvider> is not wrapping your app');
  }

  return context;
}
