import {PropsWithChildren, ReactNode} from 'react';
import {GradientName} from '../colors';

export interface PillProps extends PropsWithChildren {
  gradientName?: GradientName;
  className?: string;
  icon?: ReactNode;
}
