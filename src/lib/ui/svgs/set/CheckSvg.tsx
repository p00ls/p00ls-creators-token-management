import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const CheckSvg = (props: SvgProps) => {
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
        d='M45.5413 11.0413L17.5192 39.0634L2.45996 25.0799L4.50131 22.8815L17.4421 34.8979L43.42 8.92001L45.5413 11.0413Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
