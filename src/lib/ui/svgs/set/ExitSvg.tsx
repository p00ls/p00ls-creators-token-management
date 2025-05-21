import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const ExitSvg = (props: SvgProps) => {
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
        d='M5.26154 43.8L3 41.7L21.0923 24.9L3 8.1L5.26154 6L23.3538 22.8L41.4462 6L43.7077 8.1L25.6154 24.9L43.7077 41.7L41.4462 43.8L23.3538 27L5.26154 43.8Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
