import { ConnectWallet, ConnectWalletProps } from '@thirdweb-dev/react';

export function ConnectButton(props: ConnectWalletProps) {
  return <ConnectWallet {...props} />;
}
