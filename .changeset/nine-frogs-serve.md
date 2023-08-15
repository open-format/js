---
"@openformat/react": patch
---

### Fixed

- Issue with Wagmi client being recreated multiple times resulting in the signer being null and causing SDK contracts interactions to fail - #139

### Removed

- Temporarily removed WalletConnectConnector from wagmi config until we migrate to a new version of Wagmi - #139
