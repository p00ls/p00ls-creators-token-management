import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const WarningSvg = (props: SvgProps) => {
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
        d='M24 -0.000427246L0 41.9996H48L24 -0.000427246ZM24 4.0307L3.44636 39.9996H44.5536L24 4.0307Z'
        fill={fill}
      />
      <path d='M23.0002 13.9999H25.0002V27.9999H23.0002V13.9999Z' fill={fill} />
      <path d='M23.0002 31.9999H25.0002V35.9999H23.0002V31.9999Z' fill={fill} />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
