import {PanelColor} from './panelColors';

export interface IconColorPreset {
  color: string;
}

export const iconColorPresets: Record<PanelColor, IconColorPreset> = {
  'international-orange': {
    color: 'text-international-orange drop-shadow-creator-red',
  },
  'electric-lime': {color: 'text-electric-lime drop-shadow-creator-yellow'},
  'electric-lime-alternate': {
    color: 'text-electric-lime drop-shadow-creator-yellow',
  },
  'ultramarine-blue-1': {
    color: 'text-ultramarine-blue drop-shadow-creator-yellow',
  },
  'ultramarine-blue-2': {
    color: 'text-ultramarine-blue drop-shadow-creator-blue',
  },
  'jelly-bean-blue': {color: 'text-jelly-bean-blue drop-shadow-creator-blue'},
  'light-pastel-purple': {
    color: 'text-light-pastel-purple drop-shadow-creator-pink',
  },
  purple: {color: 'text-purple drop-shadow-creator-pink'},
  'persian-pink': {color: 'text-persian-pink drop-shadow-creator-pink'},
};
