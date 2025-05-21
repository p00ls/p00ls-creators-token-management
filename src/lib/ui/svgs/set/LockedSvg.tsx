import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const LockedSvg = (props: SvgProps) => {
  const { fill, gradientMaybe, prefix } = useSvg(props);
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
          d='M41.9995 22.0003H5.99951V46.0003H41.9995V22.0003ZM3.99951 20.0003V48.0003H43.9995V20.0003H3.99951Z'
          fill={fill}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.9998 3.00032C17.9246 3.00032 12.9998 7.92519 12.9998 14.0003V20.0003H10.9998V14.0003C10.9998 6.82062 16.8201 1.00032 23.9998 1.00032C31.1795 1.00032 36.9998 6.82062 36.9998 14.0003V20.0003H34.9998V14.0003C34.9998 7.92519 30.0749 3.00032 23.9998 3.00032Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id={prefix('clip_path')}>
          <rect width='48' height='48' fill={fill} />
        </clipPath>
        {gradientMaybe}
      </defs>
    </svg>
  );
};
