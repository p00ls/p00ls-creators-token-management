import {useMemo} from 'react';
import {gradientConfigurations} from '../colors';
import {LinearGradient} from './LinearGradient';
import {SvgProps} from './svgProps';
import {useSvgPrefix} from './useSvgPrefix';

export function useSvg({gradientName}: SvgProps) {
  const {prefix} = useSvgPrefix();
  const fill = gradientName ? `url(#${prefix('gradient')})` : 'currentColor';

  const gradientMaybe = useMemo(() => {
    if (!gradientName) {
      return null;
    }
    return (
      <LinearGradient
        id={prefix('gradient')}
        linearGradientDescription={gradientConfigurations[gradientName]}
      />
    );
  }, [prefix, gradientName]);

  return {gradientMaybe, fill, prefix};
}
