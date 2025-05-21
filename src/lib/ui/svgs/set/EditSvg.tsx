import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export function EditSvg(props: SvgProps) {
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
        d='M4.45458 48C3.21746 48 0.000935718 48 0.000935718 48C0.000935718 48 0.000968218 44.7835 0.000968218 43.5464V10.3918C0.000968218 9.15464 3.05176e-05 6 3.05176e-05 6C3.05176e-05 6 3.21746 5.93814 4.45458 5.93814H25.6092L9.40303 22.1443V38.5979H25.8566L42.0628 22.3299V43.5464C42.0628 44.7835 42.0009 48 42.0628 48C42.0628 48 38.8463 48 37.6092 48H4.45458ZM14.8463 33.1546V24.3711L31.9803 7.23711L40.8257 15.8969L23.6298 33.1546H14.8463Z'
        fill={fill}
      />
      <path
        d='M44.9999 12L35.9999 3L38.9999 0L47.9999 9L44.9999 12Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
}
