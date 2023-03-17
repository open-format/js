import { Signer } from 'ethers';
import { ERC721Base, ERC721Factory } from '../contract-types';
import { ERC20Instance } from '../core/token/ERC20Instance';
import { ERC721Instance } from '../core/token/ERC721Instance';

///////////////////
///     SDK     ///
///////////////////

export interface SDKOptions {
  network: Chain;
  appId: string;
  signer?: Signer | string;
}

///////////////////
///  CONTRACTS  ///
///////////////////

export type OpenFormatContract = ERC721Instance | ERC20Instance;

export enum ContractType {
  ERC721 = 'ERC721',
  ERC20 = 'ERC20',
}

///////////////////
///    CHAINS   ///
///////////////////

export type Chain = 'mainnet' | 'mumbai' | 'localhost' | (string & {});

export type ChainId = number;

export type ChainConfig = {
  id: Chain;
  chainId: number;
  name: string;
  token: string;
  rpcUrl: string;
  subgraph: string;
};

///////////////////
///  SUBGRAPH   ///
///////////////////

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

///////////////////
///  Functions  ///
///////////////////

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type GetContractParameters = AtLeastOne<{
  contractAddress: string;
  name: string;
}>;

///////////////////
////  ERC721   ////
///////////////////

export interface ERC721CreateParams {
  name: Parameters<ERC721Factory['createERC721']>[0];
  symbol: Parameters<ERC721Factory['createERC721']>[1];
  royaltyRecipient: Parameters<ERC721Factory['createERC721']>[2];
  royaltyBps: Parameters<ERC721Factory['createERC721']>[3];
  overrides?: Parameters<ERC721Factory['createERC721']>[4];
}

export interface ERC721MintParams {
  to: Parameters<ERC721Base['mintTo']>[0];
  tokenURI: Parameters<ERC721Base['mintTo']>[1];
  overrides?: Parameters<ERC721Base['mintTo']>[2];
}

export interface ERC721BatchMintParams {
  to: Parameters<ERC721Base['batchMintTo']>[0];
  quantity: Parameters<ERC721Base['batchMintTo']>[1];
  baseURI: Parameters<ERC721Base['batchMintTo']>[2];
  overrides?: Parameters<ERC721Base['batchMintTo']>[3];
}

export interface ERC721BurnParams {
  tokenId: Parameters<ERC721Base['burn']>[0];
  overrides?: Parameters<ERC721Base['burn']>[1];
}

export interface ERC721TransferParams {
  from: Parameters<ERC721Base['transferFrom']>[0];
  to: Parameters<ERC721Base['transferFrom']>[1];
  tokenId: Parameters<ERC721Base['transferFrom']>[2];
  overrides?: Parameters<ERC721Base['transferFrom']>[3];
}

export interface ERC721ApproveParams {
  account: Parameters<ERC721Base['approve']>[0];
  tokenId: Parameters<ERC721Base['approve']>[1];
  overrides?: Parameters<ERC721Base['approve']>[2];
}

export interface ERC721GetApprovedParams {
  tokenId: Parameters<ERC721Base['getApproved']>[0];
  overrides?: Parameters<ERC721Base['getApproved']>[1];
}

export interface ERC721TotalSupplyParams {
  overrides?: Parameters<ERC721Base['totalSupply']>[0];
}

export interface ERC721BalanceOfParams {
  owner: Parameters<ERC721Base['balanceOf']>[0];
  overrides?: Parameters<ERC721Base['balanceOf']>[1];
}

export interface ERC721OwnerOfParams {
  tokenId: Parameters<ERC721Base['ownerOf']>[0];
  overrides?: Parameters<ERC721Base['ownerOf']>[1];
}

export interface ERC721OwnerParams {
  overrides?: Parameters<ERC721Base['owner']>[0];
}

export interface ERC721NextTokenIdToMintParams {
  overrides?: Parameters<ERC721Base['nextTokenIdToMint']>[0];
}

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

///////////////////
////   ERC20   ////
///////////////////
