import { ContractResponse } from '../types';

export function poll({
  fn,
  validate,
  interval,
  maxAttempts,
}: {
  fn: () => void;
  validate: (response: ContractResponse) => boolean;
  interval: number;
  maxAttempts?: number;
}) {
  let attempts = 0;

  const executePoll = async (resolve, reject) => {
    const result = await fn();
    attempts++;

    //@TODO fix type
    //@ts-ignore
    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new Error('Exceeded max attempts'));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
}
