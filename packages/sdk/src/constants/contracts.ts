import unionBy from 'lodash.unionby';
import ERC721LazyDropFacet from '../../abis/facet/ERC721LazyDropFacet.json';
import RewardsFacet from '../../abis/facet/RewardsFacet.json';
import SettingsFacet from '../../abis/facet/SettingsFacet.json';
import AppFactory from '../../abis/factories/AppFactory.json';
import Proxy from '../../abis/proxy/Proxy.json';
import ERC20Base from '../../abis/tokens/ERC20/ERC20Base.json';
import ERC721Base from '../../abis/tokens/ERC721/ERC721Base.json';
import ERC721LazyMint from '../../abis/tokens/ERC721/ERC721LazyMint.json';

export const abis = unionBy(
  Proxy,
  ERC20Base,
  SettingsFacet,
  RewardsFacet,
  // @ts-ignore
  ERC721Base,
  AppFactory,
  ERC721LazyDropFacet,
  ERC721LazyMint,
  'name'
);
