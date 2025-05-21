import classNames from 'classnames';
import {SvgProps} from '../svgProps';
import {ArrowBackSvg} from './ArrowBackSvg';

export const ArrowSvg = (props: SvgProps) => {
  return (
    <ArrowBackSvg
      {...props}
      className={classNames('rotate-180', props.className)}
    />
  );
};
