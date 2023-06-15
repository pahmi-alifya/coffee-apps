import {multipleRequest, request} from '@request';
import {useCallback, useEffect, useRef, useState} from 'react';
import useSWR, {
  Middleware,
  MutatorOptions,
  SWRConfiguration,
  SWRHook,
  SWRResponse,
  useSWRConfig,
} from 'swr';
import useSWRImmutable from 'swr/immutable';
import {authHeader} from '../request/helper';
import {MutationStatus} from './swr.types';

export const globalToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI4NTE1NjA0MzI2NSIsImlhdCI6MTY1OTQyOTg5NiwiZXhwIjoxNjkwOTY1ODk2fQ.T4ew84RYPz-mBBAf67ztZ47QPL1T1Xt7kM_kukANM6Q';

/**
 * mutation hook using swr to mutate data from server. Default method is POST.
 * You can use either mutate or mutateAsync to mutate data.
 * When using mutate, you can pass in a callback function to mutate the data.
 * When using mutateAsync, you have to handling the error yourself.
 *
 *
 * ### example:
 * ```tsx
 * const {mutate, isLoading} = useRequest<BodyType, ResponseType>(
 *    'api/product/1',
 *    {method: 'put'}
 * );
 * ...
 * ...
 * <Button
 *    onPress={() => mutate({title: 'New Soap Brand', price: 10000})}
 *    loading={isLoading}
 * />
 * ```
 */
export function useRequest<Data = any, Response = any, Error = any>(
  url: string,
  options: MutatorOptions<Data> & {
    method?: 'post' | 'put' | 'patch' | 'delete';
  } = {
    method: 'post',
  },
) {
  const [status, setStatus] = useState<MutationStatus>(MutationStatus.Idle);
  const isIdle = status === MutationStatus.Idle;
  const isLoading = status === MutationStatus.Loading;
  const isError = status === MutationStatus.Error;
  const isSuccess = status === MutationStatus.Success;

  const mutateAsync = useCallback(
    async (data?: Data): Promise<Response> => {
      try {
        setStatus(MutationStatus.Loading);

        const response = await request(url, {
          body: JSON.stringify(data),
          method: options.method,
          headers: {
            /**
             * TODO: Might need to get the real auth token from MMKV storage
             * once Login's PR is merged. Temporarily, we can use the provided globalToken.
             */
            ...authHeader(globalToken),
          },
        });

        setStatus(MutationStatus.Success);

        return response;
      } catch (e: unknown) {
        if (__DEV__) {
          console.error(e);
        }

        setStatus(MutationStatus.Error);

        throw e as Error;
      }
    },
    [options, url],
  );

  const mutate = useCallback(
    (
      data?: Data,
      handler?: {
        onSuccess?: (data: Response) => void;
        onError?: (error: Error) => void;
        onSettled?: () => void;
      },
    ) => {
      mutateAsync(data)
        .then((response) => {
          handler?.onSuccess?.(response);
        })
        .catch((error) => {
          handler?.onError?.(error);
        })
        .then(() => {
          handler?.onSettled?.();
        });
    },
    [mutateAsync],
  );

  return {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    mutate,
    mutateAsync,
  };
}

interface QueryConfiguration<TData, TError>
  extends SWRConfiguration<TData, TError> {
  immutable?: boolean;
  enabled?: boolean;
}

export interface QueryResult<TData, TError> extends SWRResponse<TData, TError> {
  isLoading: boolean;
}

export function useQuery<TData, TError = void>(
  url: string | null,
  config: QueryConfiguration<TData, TError> = {},
): QueryResult<TData, TError> {
  const {immutable = false, enabled = true, ...restConfig} = config;
  const swr = immutable ? useSWRImmutable : useSWR;

  const {data, error, ...restResult} = swr<TData>(
    enabled ? url : null,
    () =>
      request(url as string, {
        headers: {
          /**
           * TODO: Might need to get the real auth token from MMKV storage
           * once Login's PR is merged. Temporarily, we can use the provided globalToken.
           */
          ...authHeader(globalToken),
        },
      }),
    restConfig,
  );

  return {
    data,
    error,
    isLoading: !data && !error, // Derived loading status, since swr doesn't provide it.
    ...restResult,
  };
}

export function useMultipleQuery(urls: string[], config?: SWRConfiguration) {
  return useSWR(urls, multipleRequest, config);
}

// https://swr.vercel.app/docs/advanced/cache#mutate-multiple-keys-from-regex
export function useMatchMutate() {
  const {cache, mutate} = useSWRConfig();

  return (matcher: any, ...args: any) => {
    if (!(cache instanceof Map)) {
      throw new Error(
        'matchMutate requires the cache provider to be a Map instance',
      );
    }

    const keys = [];

    for (const key of cache.keys()) {
      if (matcher.test(key)) {
        keys.push(key);
      }
    }

    const mutations = keys.map((key) => mutate(key, ...args));
    return Promise.all(mutations);
  };
}

// https://swr.vercel.app/docs/middleware#keep-previous-result
export const laggy: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef<unknown>();

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData =
      swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    const isLagging =
      swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    });
  };
