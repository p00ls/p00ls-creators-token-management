import {ColorSet} from './colors';
import {buildGradientDirective, P00lsGradientName} from './gradients';
import {IconColorPreset, iconColorPresets} from './iconColors';

export type PanelColor =
  | ColorSet<
  | 'international-orange'
  | 'electric-lime'
  | 'jelly-bean-blue'
  | 'light-pastel-purple'
  | 'purple'
  | 'persian-pink'
>
  | 'ultramarine-blue-1'
  | 'ultramarine-blue-2'
  | 'electric-lime-alternate';

export interface PanelColorPreset {
  iconColor: {
    active: IconColorPreset;
    inactive: IconColorPreset;
  };
  textColor: {
    active: string;
    inactive: string;
  };
}

const inactiveIconColor =
  'text-granite-gray group-hover:text-white hover:text-white group-hover:drop-shadow-white hover:drop-shadow-white';
const inactiveTextColor =
  'text-granite-gray group-hover:text-white group-hover:drop-shadow-white group-hover:bg-clip-content group-hover:bg-none hover:text-white hover:drop-shadow-white hover:bg-clip-content hover:bg-none';

export const panelColorPresets: Record<PanelColor, PanelColorPreset> = {
  'international-orange': {
    iconColor: {
      active: iconColorPresets['international-orange'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_12
      )} drop-shadow-creator-red`,
      inactive: inactiveTextColor,
    },
  },
  'electric-lime': {
    iconColor: {
      active: iconColorPresets['electric-lime'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_01
      )} drop-shadow-creator-yellow`,
      inactive: inactiveTextColor,
    },
  },
  'electric-lime-alternate': {
    iconColor: {
      active: iconColorPresets['electric-lime'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_15
      )} drop-shadow-creator-yellow`,
      inactive: inactiveTextColor,
    },
  },
  'ultramarine-blue-1': {
    iconColor: {
      active: iconColorPresets['ultramarine-blue-1'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_05
      )} drop-shadow-creator-yellow`,
      inactive: inactiveTextColor,
    },
  },
  'ultramarine-blue-2': {
    iconColor: {
      active: iconColorPresets['ultramarine-blue-2'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_14
      )} drop-shadow-creator-blue`,
      inactive: inactiveTextColor,
    },
  },
  'jelly-bean-blue': {
    iconColor: {
      active: iconColorPresets['jelly-bean-blue'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_09
      )}  drop-shadow-creator-blue`,
      inactive: inactiveTextColor,
    },
  },
  'light-pastel-purple': {
    iconColor: {
      active: iconColorPresets['light-pastel-purple'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_10
      )}  drop-shadow-creator-pink`,
      inactive: inactiveTextColor,
    },
  },
  purple: {
    iconColor: {
      active: iconColorPresets['purple'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_07
      )}  drop-shadow-creator-pink`,
      inactive: inactiveTextColor,
    },
  },
  'persian-pink': {
    iconColor: {
      active: iconColorPresets['persian-pink'],
      inactive: {
        color: inactiveIconColor,
      },
    },
    textColor: {
      active: `bg-clip-text text-transparent ${buildGradientDirective(
        P00lsGradientName.GRADIENT_13
      )}  drop-shadow-creator-pink`,
      inactive: inactiveTextColor,
    },
  },
};
