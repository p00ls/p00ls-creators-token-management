import {useMemo} from 'react';
import {createAppLogger} from './logger';
import {useBuildConfiguration} from '../configuration/BuildConfigurationProvider';

export function useLogger(category: string) {
  const {logLevel} = useBuildConfiguration();
  return useMemo(
    () => createAppLogger({category, level: logLevel}),
    [category, logLevel]
  );
}
