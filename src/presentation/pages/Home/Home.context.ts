import {OutletType} from '@models';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';

interface HomeContextProps {
  searchKeyword: string;
  scrollPosition: SharedValue<number>;
  selectedOutlet?: OutletType;
  handleOutletPress(): void;
}

const HomeContext = React.createContext<HomeContextProps>(
  {} as HomeContextProps,
);

export const HomeContextProvider = HomeContext.Provider;
export const useHomeContext = () => React.useContext(HomeContext);
