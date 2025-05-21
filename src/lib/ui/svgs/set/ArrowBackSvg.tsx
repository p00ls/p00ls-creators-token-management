import {SvgProps} from '../svgProps';
import {useSvg} from '../useSvg';

export const ArrowBackSvg = (props: SvgProps) => {
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
        d='M4.06219 23.9998L14.6688 34.6064L13.2546 36.0206L1.23376 23.9998L13.2546 11.979L14.6688 13.3932L4.06219 23.9998Z'
        fill={fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.00001 22.9998H46V24.9998H4.00001V22.9998Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
