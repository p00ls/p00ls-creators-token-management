import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const SearchSvg = (props: SvgProps) => {
  const { fill, gradientMaybe } = useSvg(props);
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
        d='M30.1187 28.7047L39.7068 38.2929L38.2926 39.7071L28.7045 30.1189L30.1187 28.7047Z'
        fill={fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M33.1762 20.5883C33.1762 27.5406 27.5402 33.1765 20.588 33.1765C13.6357 33.1765 7.99973 27.5406 7.99973 20.5883C7.99973 13.636 13.6357 8.00003 20.588 8.00003C27.5402 8.00003 33.1762 13.636 33.1762 20.5883ZM20.588 31.1765C26.4357 31.1765 31.1762 26.436 31.1762 20.5883C31.1762 14.7405 26.4357 10 20.588 10C14.7402 10 9.99973 14.7405 9.99973 20.5883C9.99973 26.436 14.7402 31.1765 20.588 31.1765Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
