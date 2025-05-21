import {SvgProps} from '../svgProps';
import {useSvg} from '../useSvg';

export const CircleSvg = (props: SvgProps) => {
  const {fill, gradientMaybe} = useSvg(props);
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24 44.8C35.4875 44.8 44.8 35.4875 44.8 24C44.8 12.5125 35.4875 3.2 24 3.2C12.5125 3.2 3.2 12.5125 3.2 24C3.2 35.4875 12.5125 44.8 24 44.8ZM24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
