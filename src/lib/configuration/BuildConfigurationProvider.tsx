import {createContext, PropsWithChildren, useContext} from 'react';
import {BuildConfiguration} from './buildConfiguration';

const BuildConfigurationContext = createContext<BuildConfiguration | undefined>(
  undefined
);

export function useBuildConfiguration() {
  const result = useContext(BuildConfigurationContext);
  if (!result) {
    throw new Error('Missing build configuration provider');
  }
  return result;
}

export function BuildConfigurationProvider({
                                             children,
                                             value,
                                           }: PropsWithChildren<{ value: BuildConfiguration }>) {
  return (
    <BuildConfigurationContext.Provider value={value}>
      {children}
    </BuildConfigurationContext.Provider>
  );
}
