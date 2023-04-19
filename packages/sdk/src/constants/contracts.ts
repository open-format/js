import unionBy from 'lodash.unionby';
import ERC721LazyDropFacet from '../../abis/facet/ERC721LazyDropFacet.json';
import RewardFacet from '../../abis/facet/RewardFacet.json';
import SettingsFacet from '../../abis/facet/SettingsFacet.json';
import Factory from '../../abis/Factory/Factory.json';
import Proxy from '../../abis/proxy/Proxy.json';
import ERC20Base from '../../abis/tokens/ERC20/ERC20Base.json';
import ERC721Base from '../../abis/tokens/ERC721/ERC721Base.json';
import ERC721LazyMint from '../../abis/tokens/ERC721/ERC721LazyMint.json';

export const abis = unionBy(
  Proxy,
  ERC20Base,
  SettingsFacet,
  RewardFacet,
  ERC721Base,
  Factory,
  ERC721LazyDropFacet,
  ERC721LazyMint,
  'name'
);
