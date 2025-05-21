import {SvgProps} from '../svgProps';
import {useSvg} from '../useSvg';

export function CoinbaseSvg(props: SvgProps) {
  const {fill, gradientMaybe} = useSvg(props);
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
        d='M24 5C13.506 5 5 13.506 5 24C5 34.494 13.506 43 24 43C34.494 43 43 34.494 43 24C43 13.506 34.494 5 24 5ZM3 24C3 12.4014 12.4014 3 24 3C35.5986 3 45 12.4014 45 24C45 35.5986 35.5986 45 24 45C12.4014 45 3 35.5986 3 24ZM19.0738 18.6074C18.8846 18.6074 18.6074 18.7974 18.6074 19.1841V28.8136C18.6074 29.2014 18.8833 29.3904 19.0738 29.3904H28.924C29.1141 29.3904 29.3904 29.2017 29.3904 28.8136V19.1841C29.3904 18.7963 29.1145 18.6074 28.924 18.6074H19.0738ZM16.6074 19.1841C16.6074 17.832 17.6457 16.6074 19.0738 16.6074H28.924C30.3553 16.6074 31.3904 17.833 31.3904 19.1841V28.8136C31.3904 30.169 30.3512 31.3904 28.924 31.3904H19.0738C17.6425 31.3904 16.6074 30.1647 16.6074 28.8136V19.1841Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
}
