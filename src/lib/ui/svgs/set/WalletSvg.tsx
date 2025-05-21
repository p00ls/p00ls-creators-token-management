import {SvgProps} from '../svgProps';
import {useSvg} from '../useSvg';

export const WalletSvg = (props: SvgProps) => {
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
        d='M46 14H2V43H46V14ZM0 12V45H48V12H0Z'
        fill={fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M37 5H2V12H37V5ZM0 3V14H39V3H0Z'
        fill={fill}
      />
      <path d='M36 20H40V24H36V20Z' fill={fill}/>
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
