import { Chain } from '@wagmi/chains';
import { Signer } from 'ethers';
import {
  ERC20Base as ERC20BaseContract,
  ERC20FactoryFacet,
  ERC721Base as ERC721BaseContract,
  ERC721FactoryFacet,
  ERC721LazyDropFacet,
  ERC721LazyMint as ERC721LazyMintContract,
  SettingsFacet,
} from '../contract-types';
import { ERC20Base } from '../core/token/ERC20/ERC20Base';
import { ERC721Base } from '../core/token/ERC721/ERC721Base';
import { ERC721LazyMint } from '../core/token/ERC721/ERC721LazyMint';

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

export type OpenFormatContract = ERC20Base | ERC721Base | ERC721LazyMint;

export enum ContractType {
  NFT = 'NFT',
  NFTDrop = 'NFTDrop',
  NFTLazyMint = 'NFTLazyMint',
  Token = 'Token',
}

export enum ImplementationType {
  BASE = 'Base',
  LAZY_MINT = 'LazyMint',
}

export enum Roles {
  ADMIN_ROLE = '0',
  MINTER_ROLE = '1',
}

export type ClaimCondition = {
  startTimestamp: number;
  supplyClaimed: number;
  maxClaimableSupply: number;
  quantityLimitPerWallet: number;
  pricePerToken: number;
  currency: string;
};

export type ChainId = number;

export interface Contracts {
  [key: string]: {
    address: string;
  };
}

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
  name: Parameters<ERC721FactoryFacet['createERC721']>[0];
  symbol: Parameters<ERC721FactoryFacet['createERC721']>[1];
  royaltyRecipient: Parameters<ERC721FactoryFacet['createERC721']>[2];
  royaltyBps: Parameters<ERC721FactoryFacet['createERC721']>[3];
  overrides?: Parameters<ERC721FactoryFacet['createERC721']>[5];
}

export interface ERC721MintParams {
  to: Parameters<ERC721BaseContract['mintTo']>[0];
  tokenURI: Parameters<ERC721BaseContract['mintTo']>[1];
  overrides?: Parameters<ERC721BaseContract['mintTo']>[2];
}

export interface ERC721SetMinterRoleParams {
  role: Parameters<ERC721BaseContract['grantRole']>[0];
  account: Parameters<ERC721BaseContract['grantRole']>[1];
  overrides?: Parameters<ERC721BaseContract['grantRole']>[2];
}

export interface ERC721BatchMintParams {
  to: Parameters<ERC721BaseContract['batchMintTo']>[0];
  quantity: Parameters<ERC721BaseContract['batchMintTo']>[1];
  baseURI: Parameters<ERC721BaseContract['batchMintTo']>[2];
  overrides?: Parameters<ERC721BaseContract['batchMintTo']>[3];
}

export interface ERC721BurnParams {
  tokenId: Parameters<ERC721BaseContract['burn']>[0];
  overrides?: Parameters<ERC721BaseContract['burn']>[1];
}

export interface ERC721TransferParams {
  from: Parameters<ERC721BaseContract['transferFrom']>[0];
  to: Parameters<ERC721BaseContract['transferFrom']>[1];
  tokenId: Parameters<ERC721BaseContract['transferFrom']>[2];
  overrides?: Parameters<ERC721BaseContract['transferFrom']>[3];
}

export interface ERC721ApproveParams {
  spender: Parameters<ERC721BaseContract['approve']>[0];
  tokenId: Parameters<ERC721BaseContract['approve']>[1];
  overrides?: Parameters<ERC721BaseContract['approve']>[2];
}

export interface ERC721GetApprovedParams {
  tokenId: Parameters<ERC721BaseContract['getApproved']>[0];
  overrides?: Parameters<ERC721BaseContract['getApproved']>[1];
}

export interface ERC721TotalSupplyParams {
  overrides?: Parameters<ERC721BaseContract['totalSupply']>[0];
}

export interface ERC721BalanceOfParams {
  owner: Parameters<ERC721BaseContract['balanceOf']>[0];
  overrides?: Parameters<ERC721BaseContract['balanceOf']>[1];
}

export interface ERC721OwnerOfParams {
  tokenId: Parameters<ERC721BaseContract['ownerOf']>[0];
  overrides?: Parameters<ERC721BaseContract['ownerOf']>[1];
}

export interface ERC721NextTokenIdToMintParams {
  overrides?: Parameters<ERC721BaseContract['nextTokenIdToMint']>[0];
}

export interface ERC721LazyMint_LazyMintParams {
  amount: Parameters<ERC721LazyMintContract['lazyMint']>[0];
  baseURIForTokens: Parameters<ERC721LazyMintContract['lazyMint']>[1];
  data: Parameters<ERC721LazyMintContract['lazyMint']>[2];
  overrides?: Parameters<ERC721LazyMintContract['lazyMint']>[3];
}

export interface ERC721LazyMint_MintParams {
  to: Parameters<ERC721LazyMintContract['mintTo']>[0];
  overrides?: Parameters<ERC721LazyMintContract['mintTo']>[1];
}

export interface ERC721LazyMint_BatchMintParams {
  to: Parameters<ERC721LazyMintContract['batchMintTo']>[0];
  quantity: Parameters<ERC721LazyMintContract['batchMintTo']>[1];
  overrides?: Parameters<ERC721LazyMintContract['batchMintTo']>[2];
}

export interface ERC721LazyMint_BurnParams {
  tokenId: Parameters<ERC721LazyMintContract['burn']>[0];
  overrides?: Parameters<ERC721LazyMintContract['burn']>[1];
}

export interface ERC721LazyMint_TransferParams {
  from: Parameters<ERC721LazyMintContract['transferFrom']>[0];
  to: Parameters<ERC721LazyMintContract['transferFrom']>[1];
  tokenId: Parameters<ERC721LazyMintContract['transferFrom']>[2];
  overrides?: Parameters<ERC721LazyMintContract['transferFrom']>[3];
}

export interface ERC721LazyMint_SetMinterRoleParams {
  role: Parameters<ERC721LazyMintContract['grantRole']>[0];
  account: Parameters<ERC721LazyMintContract['grantRole']>[1];
  overrides?: Parameters<ERC721LazyMintContract['grantRole']>[2];
}

export interface ERC721LazyMint_SetClaimConditionParams {
  condition: Parameters<
    ERC721LazyDropFacet['ERC721LazyDrop_setClaimCondition']
  >[1];
  resetClaimEligibility: Parameters<
    ERC721LazyDropFacet['ERC721LazyDrop_setClaimCondition']
  >[2];
  overrides?: Parameters<
    ERC721LazyDropFacet['ERC721LazyDrop_setClaimCondition']
  >[3];
}

export interface ERC721LazyMint_RemoveClaimConditionParams {
  overrides?: Parameters<
    ERC721LazyDropFacet['ERC721LazyDrop_removeClaimCondition']
  >[1];
}

export interface ERC721LazyMint_GetClaimConditionParams {
  overrides?: Parameters<
    ERC721LazyDropFacet['ERC721LazyDrop_getClaimCondition']
  >[1];
}

export interface ERC721LazyMint_ClaimParams {
  receiver: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_claim']>[1];
  quantity: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_claim']>[2];
  currency: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_claim']>[3];
  pricePerToken: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_claim']>[4];
  overrides?: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_claim']>[5];
}

export interface ERC721LazyMint_VerifyClaimParams {
  claimer: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_verifyClaim']>[1];
  quantity: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_verifyClaim']>[2];
  currency: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_verifyClaim']>[3];
  pricePerToken: Parameters<
    ERC721LazyDropFacet['ERC721LazyDrop_verifyClaim']
  >[4];
  overrides?: Parameters<ERC721LazyDropFacet['ERC721LazyDrop_verifyClaim']>[5];
}

export interface ERC721LazyDrop_SetClaimConditionParams
  extends ERC721LazyMint_SetClaimConditionParams {}

export interface ERC721LazyDrop_RemoveClaimConditionParams
  extends ERC721LazyMint_RemoveClaimConditionParams {}

export interface ERC721LazyDrop_GetClaimConditionParams
  extends ERC721LazyMint_GetClaimConditionParams {}

export interface ERC721LazyDrop_ClaimParams
  extends ERC721LazyMint_ClaimParams {}

export interface ERC721LazyDrop_VerifyClaimParams
  extends ERC721LazyMint_VerifyClaimParams {}

///////////////////
////   ERC20   ////
///////////////////

export interface ERC20CreateParams {
  name: Parameters<ERC20FactoryFacet['createERC20']>[0];
  symbol: Parameters<ERC20FactoryFacet['createERC20']>[1];
  supply: Parameters<ERC20FactoryFacet['createERC20']>[3];
  overrides?: Parameters<ERC20FactoryFacet['createERC20']>[5];
}

export interface ERC20MintParams {
  to: Parameters<ERC20BaseContract['mintTo']>[0];
  amount: Parameters<ERC20BaseContract['mintTo']>[1];
  overrides?: Parameters<ERC20BaseContract['mintTo']>[2];
}

export interface ERC20BurnParams {
  amount: Parameters<ERC20BaseContract['burn']>[0];
  overrides?: Parameters<ERC20BaseContract['burn']>[1];
}

export interface ERC20TransferParams {
  to: Parameters<ERC20BaseContract['transfer']>[0];
  amount: Parameters<ERC20BaseContract['transfer']>[1];
  overrides?: Parameters<ERC20BaseContract['transfer']>[2];
}

export interface ERC20TransferFromParams {
  from: Parameters<ERC20BaseContract['transferFrom']>[0];
  to: Parameters<ERC20BaseContract['transferFrom']>[1];
  amount: Parameters<ERC20BaseContract['transferFrom']>[2];
  overrides?: Parameters<ERC20BaseContract['transferFrom']>[3];
}

export interface ERC20ApproveParams {
  spender: Parameters<ERC20BaseContract['approve']>[0];
  amount: Parameters<ERC20BaseContract['approve']>[1];
  overrides?: Parameters<ERC20BaseContract['approve']>[2];
}

export interface ERC20AllowanceParams {
  holder: Parameters<ERC20BaseContract['allowance']>[0];
  spender: Parameters<ERC20BaseContract['allowance']>[1];
  overrides?: Parameters<ERC20BaseContract['allowance']>[2];
}

export interface ERC20TotalSupplyParams {
  overrides?: Parameters<ERC20BaseContract['totalSupply']>[0];
}

export interface ERC20BalanceOfParams {
  account: Parameters<ERC20BaseContract['balanceOf']>[0];
  overrides?: Parameters<ERC20BaseContract['balanceOf']>[1];
}

///////////////////
////    App    ////
///////////////////

export interface AppSetCreatorAccessParams {
  accounts: Parameters<SettingsFacet['setCreatorAccess']>[0];
  approvals: Parameters<SettingsFacet['setCreatorAccess']>[1];
  overrides?: Parameters<SettingsFacet['setCreatorAccess']>[2];
}

export interface AppHasCreatorAccessParams {
  account: Parameters<SettingsFacet['hasCreatorAccess']>[0];
  overrides?: Parameters<SettingsFacet['hasCreatorAccess']>[1];
}

export interface AppSetAcceptedCurrenciesParams {
  currencies: Parameters<SettingsFacet['setAcceptedCurrencies']>[0];
  approvals: Parameters<SettingsFacet['setAcceptedCurrencies']>[1];
  overrides?: Parameters<SettingsFacet['setAcceptedCurrencies']>[2];
}

///////////////////
////  Reward   ////
///////////////////

export enum RewardType {
  XP = 'XP',
  BADGE = 'BADGE',
  REWARD_CURRENCY = 'REWARD_CURRENCY',
}

export enum ActivityType {
  ACTION = 'ACTION',
  MISSION = 'MISSION',
}

export interface RewardTriggerParams {
  receiver: string;
  tokens: RewardToken[];
}

export interface RewardToken {
  amount: number;
  address: string;
  type: RewardType;
  id: string;
  activityType: ActivityType;
  tokenURI?: string;
  holderAddress?: string;
}

export interface Reward_CreateBadgeParams {
  name: string;
  symbol: string;
  tokenURI: string;
}

///////////////////
////  Errors   ////
///////////////////

export enum ContractErrors {
  ERC20Base__ApproveFromZeroAddress = 'Cannot approve from zero address',
  ERC20Base__ApproveToZeroAddress = 'Cannot approve to zero address',
  ERC20Base__BurnExceedsBalance = 'Burn amount exceeds balance',
  ERC20Base__BurnFromZeroAddress = 'Cannot burn from zero address',
  ERC20Base__MintToZeroAddress = 'Cannot mint to zero address',
  ERC20Base__TransferExceedsBalance = 'Transfer amount exceeds balance',
  ERC20Base__TransferFromZeroAddress = 'Cannot transfer from zero address',
  ERC20Base__TransferToZeroAddress = 'Cannot transfer to zero address',
  ERC20Base_insufficientBalance = 'The caller does not have enough balance to burn the tokens',
  ERC20Base__InsufficientAllowance = 'The caller does not have enough allowance the transfer the tokens',
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
  Factory_nameAlreadyUsed = 'Factory name already used',
}
