import { Chains, OpenFormatSDK } from '@openformat/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Aurora, AuroraTestnet, Mumbai, Polygon } from '@thirdweb-dev/chains';
import {
  Chain,
  localWallet,
  metamaskWallet,
  ThirdwebProvider,
  useChain,
  useSigner,
} from '@thirdweb-dev/react';
import { Signer } from 'ethers';
import React, { createContext, useContext } from 'react';
import { getNetworkByChainId } from './helpers';
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
    // @ts-ignore
    networks: [Chains.polygonMumbai],
    appId: '',
    activeChain: 'mumbai',
  },
}: {
  children: React.ReactNode;
  config?: {
    networks: Chain[];
    appId: string;
    clientId: string;
    signer?: Signer | string;
    activeChain?: 'mumbai' | 'polygon' | 'aurora' | 'aurora-testnet';
  };
}) {
  return (
    <ThirdwebProvider
      activeChain={config.activeChain}
      clientId={config.clientId}
      supportedChains={[Polygon, Aurora, Mumbai, AuroraTestnet]}
      autoConnect={true}
      supportedWallets={[metamaskWallet({ recommended: true }), localWallet()]}
    >
      <InnerProvider config={config}>{children}</InnerProvider>
    </ThirdwebProvider>
  );
}

function InnerProvider({
  children,
  config = {
    // @ts-ignore
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
  const signer = useSigner();
  const chain = useChain();
  // @ts-ignore
  const network = getNetworkByChainId(chain?.chainId);

  const sdk = React.useMemo(() => {
    // @ts-ignore
    return new OpenFormatSDK({
      signer: signer as Signer,
      ...config,
      //@dev first network in the array of networks is the classed as the default chain.
      network: network ?? config.networks?.[0],
    });
  }, [signer, chain, network]);

  return (
    <OpenFormatContext.Provider value={{ sdk: sdk }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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
