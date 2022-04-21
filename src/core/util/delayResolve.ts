import {Millisecond} from '../Time';

export default function delayResolve<T extends any>(
  timeout: Millisecond,
  result: () => T,
): Promise<T>;
export default function delayResolve<T extends any>(
  timeout: Millisecond,
): Promise<void>;
export default function delayResolve<T extends any>(
  timeout: Millisecond,
  result?: () => T,
): Promise<T | void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result?.());
    }, timeout);
  });
}
