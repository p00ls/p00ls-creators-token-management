import {P00lsGradientName} from './gradients';

function hash(str: string): number {
  if (str.length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function generateGradientForId(id: string): P00lsGradientName {
  const gradientValues = Object.values(P00lsGradientName);
  const gradientIndex = Math.abs(hash(id) % gradientValues.length);
  return gradientValues[gradientIndex];
}
