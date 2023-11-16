import { useQuery } from '@tanstack/react-query';
import { useOpenFormat } from '../provider';

/**
 * Generate a leaderboard by a give token
 * @param {string} token Token address of the contract
 * @example 
 * ```jsx
  const xpAddress = "0x3a151f807ee4370ea173a051cb6ba0790ce10da7";
  const leaderboardData = useLeaderboard(xpAddress);

  console.log({leaderboardData})
  ```
 */

export function useLeaderboard(token: string) {
  const { sdk } = useOpenFormat();
  const data = useQuery(['leaderboard'], () =>
    sdk.data.generateLeaderboard({ token })
  );

  return data;
}
