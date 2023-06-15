import {useMatchMutate} from '@swr';
import {useCallback, useState} from 'react';

const usePullToRefresh = (keys: (string | RegExp)[]) => {
  const matchMutate = useMatchMutate();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await Promise.all(
      keys.map(async (key) => {
        await matchMutate(key);
      }),
    );

    setRefreshing(false);
  }, [keys, matchMutate]);

  return {refreshing, onRefresh};
};

export default usePullToRefresh;
