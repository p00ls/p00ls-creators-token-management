import {SvgProps} from '../svgProps';
import {useSvg} from '../useSvg';

export const CopySvg = (props: SvgProps) => {
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
        d='M10.6703 48C9.37297 48 6.00069 48 6.00069 48C6.00069 48 6 44.627 6 43.3297V10.3784H9.89189V43.3297V44.1081H10.6703H35.8378V48H10.6703ZM19.7514 38.9189C18.4541 38.9189 15 39 15 39C15 39 15.0811 35.5459 15.0811 34.2486V4.73514C15.0811 3.39459 15 0 15 0C15 0 18.4541 0 19.7514 0H41.4811C42.8216 0 46.2162 0 46.2162 0C46.2162 0 46.2162 3.39459 46.2162 4.73514V34.2486C46.2162 35.5459 46.2162 38.9189 46.2162 38.9189C46.2162 38.9189 42.8216 38.9189 41.4811 38.9189H19.7514Z'
        fill={fill}
      />
      <defs>{gradientMaybe}</defs>
    </svg>
  );
};
