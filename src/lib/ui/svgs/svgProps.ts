import {BrandGradientName, P00lsGradientName} from '../colors';

export interface SvgProps {
  className?: string;
  'aria-hidden'?: boolean;
  gradientName?: P00lsGradientName | BrandGradientName;
}
