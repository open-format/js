import { Signer } from 'ethers';
import { ERC20Instance } from '../core/token/ERC20Instance';
import { ERC721Instance } from '../core/token/ERC721Instance';

export interface SDKOptions {
  network: Chain;
  appId: string;
  signer?: Signer | string;
}

export type OpenFormatContract = ERC721Instance | ERC20Instance;

export enum ContractType {
  ERC721 = 'ERC721',
  ERC20 = 'ERC20',
}

export type Chain = 'mainnet' | 'mumbai' | 'localhost' | (string & {});

export type ChainId = number;

export type TokenProperty = {
  id: string;
  key: string;
  value: string;
};

export type ReleaseType = 'image' | 'art' | 'ticket' | 'audio' | 'video';

export type Attribute = { key: string; value: string };

export type ChainConfig = {
  id: Chain;
  chainId: number;
  name: string;
  token: string;
  rpcUrl: string;
  subgraph: string;
};

export interface NFTMetadata {
  name: string;
  description?: string;
  image?: Blob | File;
  releaseType?: ReleaseType;
  symbol: string;
  url?: string;
  metadata?: {
    [key: string]: string;
  };
  attributes?: Attribute[];
  maxSupply: number;
  mintingPrice: number;
}

export interface IPFSData {
  name: string;
  description: string;
  image: Blob | File;
  attributes?: Attribute[];
  factory_id?: string;
  release_type?: ReleaseType;
}

/**
 * Subgraph responses
 */

export interface ContractResponse {
  contracts: {
    id: string;
    createdAt: string;
    owner: string;
    type: string;
  }[];
}

export interface AppResponse {
  apps: {
    id: string;
    createdAt: string;
    owner: string;
  }[];
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

// Requires either contractAddress or name
export type GetContractParameters = AtLeastOne<{
  contractAddress: string;
  name: string;
}>;

enum ERC721Error {
  ApprovalCallerNotOwnerNorApproved = 'The caller must own the token or be an approved operator',
  ApprovalQueryForNonexistentToken = 'The token does not exist.',
  BalanceQueryForZeroAddress = 'Cannot query the balance for the zero address',
  MintToZeroAddress = 'Cannot mint to the zero address',
  MintZeroQuantity = 'The quantity of tokens minted must be more than zero',
  OwnerQueryForNonexistentToken = 'The token does not exist',
  TransferCallerNotOwnerNorApproved = 'The caller must own the token or be an approved operator',
  TransferFromIncorrectOwner = 'The token must be owned by `from`',
  TransferToNonERC721ReceiverImplementer = 'Cannot safely transfer to a contract that does not implement the ERC721Receiver interface',
  TransferToZeroAddress = 'Cannot transfer to the zero address.',
  URIQueryForNonexistentToken = 'The token does not exist',
  MintERC2309QuantityExceedsLimit = 'The `quantity` minted with ERC2309 exceeds the safety limit.',
  OwnershipNotInitializedForExtraData = 'The `extraData` cannot be set on an unintialized ownership slot.',
}

enum ERC20Error {
  ERC20Base__ApproveFromZeroAddress,
  ERC20Base__ApproveToZeroAddress,
  ERC20Base__BurnExceedsBalance,
  ERC20Base__BurnFromZeroAddress,
  ERC20Base__InsufficientAllowance,
  ERC20Base__MintToZeroAddress,
  ERC20Base__TransferExceedsBalance,
  ERC20Base__TransferFromZeroAddress,
  ERC20Base__TransferToZeroAddress,
}

const Errors = {
  OwnershipNotInitializedForExtraData:
    'The `extraData` cannot be set on an unintialized ownership slot.',
};
