import classNames from 'classnames';
import {Size} from '../sizes';
import {SpinnerSvg} from '../svgs';

interface Props {
  size?: Size;
}

const sizeVariants = {
  sm: 'h-4 w-4',
  m: 'h-8 w-8',
  lg: 'h-16 w-16',
};

export function Spinner({size = 'sm'}: Props) {
  const classes = classNames('animate-spin', sizeVariants[size]);
  return <SpinnerSvg className={classes}/>;
}
