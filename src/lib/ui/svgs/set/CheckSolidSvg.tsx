import {SvgProps} from '../svgProps';
import {useSvg} from '../useSvg';

export const CheckSolidSvg = (props: SvgProps) => {
  const {fill, gradientMaybe, prefix} = useSvg(props);
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <g clipPath={`url(#${prefix('clip_path')})`}>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.9998 48C37.2546 48 47.9998 37.2548 47.9998 24C47.9998 10.7452 37.2546 0 23.9998 0C10.7449 0 -0.000244141 10.7452 -0.000244141 24C-0.000244141 37.2548 10.7449 48 23.9998 48ZM21.6028 35.0649L35.2755 14.03L33.5986 12.94L21.2714 31.905L14.1442 24.7779L12.73 26.1921L21.6028 35.0649Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id={prefix('clip_path')}>
          <rect width='48' height='48' fill={fill}/>
        </clipPath>
        {gradientMaybe}
      </defs>
    </svg>
  );
};
