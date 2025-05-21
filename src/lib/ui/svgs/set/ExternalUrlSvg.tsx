import { SvgProps } from '../svgProps';
import { useSvg } from '../useSvg';

export const ExternalUrlSvg = (props: SvgProps) => {
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
        d='M2.99963 5H21.9996V7H4.99963V42H40.9996V23.7442H42.9996V44H2.99963V5Z'
        fill={fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M42.9999 4.99968L27 4.99968L27 2.99968L44.9999 2.99968L44.9999 18.9997H42.9999L42.9999 4.99968Z'
        fill={fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M44.6723 5.73962L22.6723 25.7396L21.327 24.2597L43.327 4.25974L44.6723 5.73962Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
