import {Color} from './colors';

export interface GradientVector {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

export const GradientOrientationRight: GradientVector = {
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '0%',
};

export const GradientOrientationLeft: GradientVector = {
  x1: '100%',
  y1: '0%',
  x2: '0%',
  y2: '0%',
};

export const GradientOrientationTop: GradientVector = {
  x1: '0%',
  y1: '100%',
  x2: '0%',
  y2: '0%',
};

export const GradientOrientationTopRight: GradientVector = {
  x1: '0%',
  y1: '100%',
  x2: '100%',
  y2: '0%',
};

export const GradientOrientationTopLeft: GradientVector = {
  x1: '100%',
  y1: '100%',
  x2: '0%',
  y2: '0%',
};

export const GradientOrientationBottom: GradientVector = {
  x1: '0%',
  y1: '0%',
  x2: '0%',
  y2: '100%',
};

export const GradientOrientationBottomRight: GradientVector = {
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '100%',
};

export const GradientOrientationBottomLeft: GradientVector = {
  x1: '100%',
  y1: '0%',
  x2: '0%',
  y2: '100%',
};

type GradientOrientation =
  | typeof GradientOrientationRight
  | typeof GradientOrientationLeft
  | typeof GradientOrientationBottom
  | typeof GradientOrientationTop
  | typeof GradientOrientationBottomRight
  | typeof GradientOrientationBottomLeft
  | typeof GradientOrientationTopLeft
  | typeof GradientOrientationTopRight;

export interface GradientStop {
  offset: string;
  stopColor: Color;
}

export interface LinearGradientDescription {
  stops: GradientStop[];
  gradientOrientation: GradientOrientation;
}

export enum P00lsGradientName {
  GRADIENT_01 = 'GRADIENT_01',
  GRADIENT_02 = 'GRADIENT_02',
  GRADIENT_03 = 'GRADIENT_03',
  GRADIENT_04 = 'GRADIENT_04',
  GRADIENT_05 = 'GRADIENT_05',
  GRADIENT_06 = 'GRADIENT_06',
  GRADIENT_07 = 'GRADIENT_07',
  GRADIENT_08 = 'GRADIENT_08',
  GRADIENT_09 = 'GRADIENT_09',
  GRADIENT_10 = 'GRADIENT_10',
  GRADIENT_11 = 'GRADIENT_11',
  GRADIENT_12 = 'GRADIENT_12',
  GRADIENT_13 = 'GRADIENT_13',
  GRADIENT_14 = 'GRADIENT_14',
  GRADIENT_15 = 'GRADIENT_15',
  GRADIENT_16 = 'GRADIENT_16',
}

export enum BrandGradientName {
  ETHEREUM = 'Ethereum',
  POLYGON = 'Polygon',
  TEZOS = 'Tezos',
  ARBITRUM = 'Arbitrum',
  OPTIMISM = 'Optimism',
  LENS = 'Lens',
  OPENSEA = 'Opensea',
  SOUNDXYZ = 'Soundxyz',
  COINBASE = 'Coinbase',
  RAINBOW = 'Rainbow',
  TRUST = 'Trust',
  WALLETCONNECT = 'WalletConnect',
  AUDIUS = 'Audius',
  SHOWTIME = 'Showtime',
  FRIENDTECH = 'Friendtech',
  BASE = 'Base',
  ZORA = 'Zora',
  AVALANCHE = 'Avalanche',
  POAP = 'Poap',
  MIRROR = 'Mirror',
  FARCASTER = 'Farcaster',
  BLAST = 'Blast',
}

const knownGradientNames: string[] = [
  ...Object.values(P00lsGradientName),
  ...Object.values(BrandGradientName),
];
export type GradientName = BrandGradientName | P00lsGradientName;

export const gradientConfigurations: Record<
  GradientName,
  LinearGradientDescription
> = {
  GRADIENT_01: {
    stops: [
      {offset: '0.38%', stopColor: 'electric-lime'},
      {offset: '98.58%', stopColor: 'maize'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_02: {
    stops: [
      {offset: '-9.42%', stopColor: 'international-orange'},
      {offset: '108.76%', stopColor: 'persian-pink'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_03: {
    stops: [
      {offset: '0.38%', stopColor: 'persian-pink'},
      {offset: '98.58%', stopColor: 'maize'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_04: {
    stops: [
      {offset: '0.38%', stopColor: 'acid-green'},
      {offset: '98.58%', stopColor: 'maize'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_05: {
    stops: [
      {offset: '0.81%', stopColor: 'true-blue'},
      {offset: '112.7%', stopColor: 'lemon-yellow'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_06: {
    stops: [
      {offset: '0.81%', stopColor: 'bud-green'},
      {offset: '112.7%', stopColor: 'royal-orange'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_07: {
    stops: [
      {offset: '0.81%', stopColor: 'purple'},
      {offset: '112.7%', stopColor: 'radical-red'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_08: {
    stops: [
      {offset: '0.81%', stopColor: 'princess-perfume'},
      {offset: '112.7%', stopColor: 'crayola'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_09: {
    stops: [
      {offset: '0.81%', stopColor: 'jelly-bean-blue'},
      {offset: '112.7%', stopColor: 'zomp'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_10: {
    stops: [
      {offset: '0.81%', stopColor: 'light-pastel-purple'},
      {offset: '112.7%', stopColor: 'rose-pink'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_11: {
    stops: [
      {offset: '0.81%', stopColor: 'persimmon'},
      {offset: '112.7%', stopColor: 'medium-violet-red'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_12: {
    stops: [
      {offset: '0.81%', stopColor: 'red-orange'},
      {offset: '112.7%', stopColor: 'lemon-yellow'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_13: {
    stops: [
      {offset: '-1.59%', stopColor: 'persian-pink'},
      {offset: '108.93%', stopColor: 'international-orange'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_14: {
    stops: [
      {offset: '0.38%', stopColor: 'ultramarine-blue'},
      {offset: '98.58%', stopColor: 'persian-pink'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  GRADIENT_15: {
    stops: [
      {offset: '3.79%', stopColor: 'electric-lime'},
      {offset: '96.21%', stopColor: 'turquoise'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  GRADIENT_16: {
    stops: [
      {offset: '-6.11%', stopColor: 'plump-purple'},
      {offset: '38.46%', stopColor: 'fandango'},
      {offset: '77.94%', stopColor: 'ruber'},
      {offset: '116.14%', stopColor: 'sandy-brown'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Ethereum: {
    stops: [
      {offset: '7.48%', stopColor: 'cornflower-blue'},
      {offset: '106.12%', stopColor: 'light-cobalt-blue'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Polygon: {
    stops: [
      {offset: '7.48%', stopColor: 'blue-violet'},
      {offset: '106.12%', stopColor: 'dark-orchid'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Tezos: {
    stops: [
      {offset: '-3.64%', stopColor: 'tezos-blue'},
      {offset: '80.98%', stopColor: 'blue-crayola'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Arbitrum: {
    stops: [
      {offset: '-1.88%', stopColor: 'japanese-indigo'},
      {offset: '41.76%', stopColor: 'lapis-lazuli'},
      {offset: '80.98%', stopColor: 'cyan-azure'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Optimism: {
    stops: [
      {offset: '7.48%', stopColor: 'rudy'},
      {offset: '106.12%', stopColor: 'dark-candy-apple-red'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Lens: {
    stops: [
      {offset: '-17.55%', stopColor: 'forest-green'},
      {offset: '109.39%', stopColor: 'june-bud'},
    ],
    gradientOrientation: GradientOrientationLeft,
  },
  Opensea: {
    stops: [
      {offset: '-3.64%', stopColor: 'tufts-blue'},
      {offset: '80.98%', stopColor: 'st-patrick-blue'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Soundxyz: {
    stops: [
      {offset: '-17.55%', stopColor: 'soundxyz-1'},
      {offset: '51.21%', stopColor: 'soundxyz-2'},
      {offset: '109.39%', stopColor: 'soundxyz-3'},
    ],
    gradientOrientation: GradientOrientationTopLeft,
  },
  Coinbase: {
    stops: [
      {offset: '0%', stopColor: 'coinbase'},
      {offset: '100%', stopColor: 'coinbase'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  Rainbow: {
    stops: [
      {offset: '-1.98%', stopColor: 'rainbow-1'},
      {offset: '19.72%', stopColor: 'rainbow-2'},
      {offset: '36.54%', stopColor: 'rainbow-3'},
      {offset: '52.81%', stopColor: 'rainbow-4'},
      {offset: '71.79%', stopColor: 'rainbow-5'},
      {offset: '87.25%', stopColor: 'rainbow-6'},
      {offset: '102.17%', stopColor: 'rainbow-7'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  Trust: {
    stops: [
      {offset: '0%', stopColor: 'trust-1'},
      {offset: '110.01%', stopColor: 'trust-2'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  WalletConnect: {
    stops: [
      {offset: '0%', stopColor: 'walletconnect'},
      {offset: '100%', stopColor: 'walletconnect'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  Audius: {
    stops: [
      {offset: '17.41%', stopColor: 'audius-1'},
      {offset: '64.85%', stopColor: 'audius-2'},
      {offset: '94.09%', stopColor: 'audius-3'},
    ],
    gradientOrientation: GradientOrientationBottomLeft,
  },
  Showtime: {
    stops: [
      {offset: '-0.97%', stopColor: 'showtime-1'},
      {offset: '27.22%', stopColor: 'showtime-2'},
      {offset: '64.78%', stopColor: 'showtime-3'},
      {offset: '89.43%', stopColor: 'showtime-4'},
    ],
    gradientOrientation: GradientOrientationTop,
  },
  Friendtech: {
    stops: [
      {offset: '7.46%', stopColor: 'friendtech-1'},
      {offset: '82.1%', stopColor: 'friendtech-2'},
      {offset: '98.92%', stopColor: 'friendtech-3'},
    ],
    gradientOrientation: GradientOrientationBottomLeft,
  },
  Base: {
    stops: [
      {offset: '18.99%', stopColor: 'blue-base'},
      {offset: '104.17%', stopColor: 'lavender'},
    ],
    gradientOrientation: GradientOrientationLeft,
  },
  Zora: {
    stops: [
      {offset: '14.5%', stopColor: 'zora-1'},
      {offset: '17.89%', stopColor: 'zora-2'},
      {offset: '24.5%', stopColor: 'zora-3'},
      {offset: '34.42%', stopColor: 'zora-4'},
      {offset: '48.24%', stopColor: 'zora-5'},
      {offset: '77.77%', stopColor: 'zora-6'},
      {offset: '92.97%', stopColor: 'zora-7'},
    ],
    gradientOrientation: GradientOrientationBottomLeft,
  },
  Blast: {
    stops: [
      {offset: '7.48%', stopColor: 'blast-1'},
      {offset: '106.12%', stopColor: 'blast-2'},
    ],
    gradientOrientation: GradientOrientationLeft,
  },
  Avalanche: {
    stops: [
      {offset: '12.87%', stopColor: 'avalanche-1'},
      {offset: '96%', stopColor: 'avalanche-2'},
    ],
    gradientOrientation: GradientOrientationBottomRight,
  },
  Poap: {
    stops: [
      {offset: '3.2%', stopColor: 'poap-1'},
      {offset: '94.91%', stopColor: 'poap-2'},
    ],
    gradientOrientation: GradientOrientationTopRight,
  },
  Mirror: {
    stops: [
      {offset: '7.48%', stopColor: 'mirror-1'},
      {offset: '79.48%', stopColor: 'mirror-2'},
      {offset: '106.12%', stopColor: 'mirror-3'},
    ],
    gradientOrientation: GradientOrientationRight,
  },
  Farcaster: {
    stops: [
      {offset: '7.48%', stopColor: 'farcaster-1'},
      {offset: '106.12%', stopColor: 'farcaster-2'},
    ],
    gradientOrientation: GradientOrientationLeft,
  },
};

function getTailwindForOrientation(gradientOrientation: GradientOrientation) {
  switch (gradientOrientation) {
    case GradientOrientationRight:
      return 'bg-gradient-to-r';
    case GradientOrientationLeft:
      return 'bg-gradient-to-l';
    case GradientOrientationTop:
      return 'bg-gradient-to-t';
    case GradientOrientationTopLeft:
      return 'bg-gradient-to-tl';
    case GradientOrientationBottom:
      return 'bg-gradient-to-b';
    case GradientOrientationBottomRight:
      return 'bg-gradient-to-br';
    case GradientOrientationBottomLeft:
      return 'bg-gradient-to-bl';
    default:
      return 'bg-gradient-to-r';
  }
}

export function buildGradientDirective(gradientName: GradientName): string {
  const directives = gradientConfigurations[gradientName].stops.map(
    (stop, index) => {
      let key = 'via';
      if (index === 0) {
        key = 'from';
      }
      if (index === gradientConfigurations[gradientName].stops.length - 1) {
        key = 'to';
      }
      return `${key}-${stop.stopColor} ${key}-[${stop.offset}]`;
    }
  );

  return `${getTailwindForOrientation(
    gradientConfigurations[gradientName].gradientOrientation
  )} ${directives.join(' ')}`;
}

export function buildGradientHoverDirective(
  gradientName: GradientName
): string {
  const directives = gradientConfigurations[gradientName].stops.map(
    (stop, index) => {
      let key = 'via';
      if (index === 0) {
        key = 'from';
      }
      if (index === gradientConfigurations[gradientName].stops.length - 1) {
        key = 'to';
      }
      return `hover:${key}-${stop.stopColor} hover:${key}-[${
        stop.offset
      }] group-hover:${key}-${stop.stopColor} group-hover:${key}-[${
        stop.offset
      }]`;
    }
  );

  return `${getTailwindForOrientation(
    gradientConfigurations[gradientName].gradientOrientation
  )} ${directives.join(' ')}`;
}

export interface PropsWithGradient {
  gradient: P00lsGradientName;
}

export function arePropsWithGradient(
  props: unknown
): props is PropsWithGradient {
  return (props as PropsWithGradient).gradient !== undefined;
}

export const Gradients = {
  parseName,
};

function parseName(name: string): GradientName {
  if (!knownGradientNames.includes(name)) {
    throw new Error(`Unknown gradient with name ${name}`);
  }
  return name as GradientName;
}
