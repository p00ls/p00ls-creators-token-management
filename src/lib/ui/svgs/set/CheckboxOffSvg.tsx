import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const CheckboxOffSvg = (props: SvgProps) => {
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
          d='M42 3H6C4.34315 3 3 4.34315 3 6V42C3 43.6569 4.34315 45 6 45H42C43.6569 45 45 43.6569 45 42V6C45 4.34315 43.6569 3 42 3ZM6 0C2.68629 0 0 2.68629 0 6V42C0 45.3137 2.68629 48 6 48H42C45.3137 48 48 45.3137 48 42V6C48 2.68629 45.3137 0 42 0H6Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id={prefix('clip_path')}>
          <rect
            width='48'
            height='48'
            fill={fill}
            transform='matrix(0 1 -1 0 48 0)'
          />
        </clipPath>
        {gradientMaybe}
      </defs>
    </svg>
  );
};
