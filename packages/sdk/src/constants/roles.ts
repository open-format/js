import { ethers } from 'ethers';

export const ADMIN_ROLE = ethers.utils.hexZeroPad(
  ethers.constants.Zero.toHexString(),
  32
);
export const MINTER_ROLE = ethers.utils.hexZeroPad(
  ethers.constants.One.toHexString(),
  32
);
