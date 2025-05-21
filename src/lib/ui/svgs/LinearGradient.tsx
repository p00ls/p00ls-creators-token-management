import {colorMap, LinearGradientDescription} from '../colors';

interface Props {
  id: string;
  linearGradientDescription: LinearGradientDescription;
}

export function LinearGradient({id, linearGradientDescription}: Props) {
  return (
    <linearGradient id={id} {...linearGradientDescription.gradientOrientation}>
      {linearGradientDescription.stops.map(({offset, stopColor}, index) => (
        <stop offset={offset} stopColor={colorMap[stopColor]} key={index}/>
      ))}
    </linearGradient>
  );
}
