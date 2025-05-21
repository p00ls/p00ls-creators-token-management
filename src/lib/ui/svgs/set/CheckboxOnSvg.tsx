import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const CheckboxOnSvg = (props: SvgProps) => {
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
          d='M6 0C2.68629 0 0 2.68629 0 6V42C0 45.3137 2.68629 48 6 48H42C45.3137 48 48 45.3137 48 42V6C48 2.68629 45.3137 0 42 0H6ZM21.9227 36.1981L37.7567 16.4056L34.2428 13.5945L21.2767 29.802L13.4402 23.2715L10.5593 26.7285L21.9227 36.1981Z'
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
