import {SvgProps} from '../svgProps';
import {useSvg} from '../useSvg';

export const Nft1FilledSvg = (props: SvgProps) => {
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
        d='M44.7846 12L24 0L3.21539 12V36L24 48L44.7846 36V12Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
