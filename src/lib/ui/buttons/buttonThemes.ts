import classNames from 'classnames';
import {buildGradientDirective, ColorSet, P00lsGradientName} from '../colors';

export type PrimaryButtonColor =
  | ColorSet<
  | 'true-blue'
  | 'red-orange'
  | 'ultramarine-blue'
  | 'electric-lime'
  | 'turquoise'
  | 'purple'
  | 'jelly-bean-blue'
  | 'international-orange'
  | 'outer-space'
  | 'white'
>
  | 'transparent-white';

export interface PrimaryButtonTheme {
  externalBackground: string;
  internalBackground: string;
  text: string;
}

export const primaryButtonThemes: Record<
  PrimaryButtonColor,
  PrimaryButtonTheme
> = {
  'red-orange': {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_12),
      'shadow-creator-yellow'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_12),
      'drop-shadow-creator-yellow'
    ),
  },
  'true-blue': {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_05),
      'shadow-creator-blue'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_05),
      'drop-shadow-creator-blue'
    ),
  },
  'ultramarine-blue': {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_14),
      'shadow-creator-pink'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_14),
      'drop-shadow-creator-pink'
    ),
  },
  'electric-lime': {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_01),
      'shadow-creator-yellow'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_01),
      'drop-shadow-creator-yellow'
    ),
  },
  turquoise: {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_15),
      'shadow-creator-yellow'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_15),
      'drop-shadow-creator-yellow'
    ),
  },
  purple: {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_07),
      'shadow-creator-purple'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_07),
      'drop-shadow-creator-purple'
    ),
  },
  'international-orange': {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_02),
      'shadow-creator-pink'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_02),
      'drop-shadow-creator-pink'
    ),
  },
  'jelly-bean-blue': {
    externalBackground: primaryExternalBackgroundWith(
      buildGradientDirective(P00lsGradientName.GRADIENT_09),
      'shadow-creator-blue'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      buildGradientDirective(P00lsGradientName.GRADIENT_09),
      'drop-shadow-creator-blue'
    ),
  },
  'outer-space': {
    externalBackground: primaryExternalBackgroundWith('bg-outer-space', ''),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      'bg-outer-space',
      ''
    ),
  },
  'transparent-white': {
    externalBackground:
      'group rounded-standard border border-white bg-none group-hover:bg-white hover:bg-white active:bg-transparent',
    internalBackground: '',
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      'bg-white',
      'drop-shadow-creator-white'
    ),
  },
  white: {
    externalBackground: primaryExternalBackgroundWith(
      'bg-white',
      'shadow-creator-white'
    ),
    internalBackground: primaryInternalBackgroundWith('bg-creator-black'),
    text: primaryTextWith(
      'group-hover:text-creator-black hover:text-creator-black',
      'bg-chinese-silver',
      'drop-shadow-creator-white'
    ),
  },
};

function primaryExternalBackgroundWith(gradient: string, boxShadow: string) {
  return `group ${boxShadow} rounded-standard ${gradient} p-[1px] focus:outline-none active:bg-none active:bg-raisin-black active:shadow-none`;
}

function primaryInternalBackgroundWith(internalBackground: string) {
  return `rounded-standard ${internalBackground} group-hover:bg-transparent hover:bg-transparent`;
}

function primaryTextWith(
  hoverTextColor: string,
  gradient: string,
  dropShadow: string
) {
  return `font-du-bois uppercase bold select-none bg-clip-text text-transparent ${gradient} ${dropShadow} ${hoverTextColor} hover:bg-none group-hover:bg-none hover:drop-shadow-none group-hover:drop-shadow-none group-active:text-white whitespace-nowrap`;
}

export type SecondaryButtonColor = ColorSet<
  'smoky-black' | 'raisin-black' | 'white' | 'spanish-gray'
>;

export interface SecondaryButtonTheme {
  background: string;
  text: string;
}

export const secondaryButtonThemes: Record<
  SecondaryButtonColor,
  SecondaryButtonTheme
> = {
  'smoky-black': {
    background:
      'group bg-smoky-black rounded-standard py-3 px-6 hover:bg-dark-charcoal active:bg-chinese-silver focus:outline-none ',
    text: 'font-du-bois font-bold text-sm uppercase text-white leading-4 tracking-widest text-center select-none active:text-creator-black group-active:text-creator-black',
  },
  'raisin-black': {
    background:
      'group bg-raisin-black rounded-standard py-3 px-6 hover:bg-dark-charcoal active:bg-chinese-silver focus:outline-none ',
    text: 'font-du-bois font-bold text-sm uppercase text-white leading-4 tracking-widest text-center select-none active:text-creator-black group-active:text-creator-black',
  },
  white: {
    background:
      'group bg-white rounded-standard py-3 px-6 hover:bg-chinese-silver active:bg-raisin-black focus:outline-none ',
    text: 'font-du-bois font-bold text-sm uppercase text-creator-black leading-4 tracking-widest text-center select-none active:text-white group-active:text-white',
  },
  'spanish-gray': {
    background:
      'group bg-raisin-black rounded-extreme py-1 px-3 hover:bg-dark-charcoal active:bg-chinese-silver focus:outline-none ',
    text: 'font-apercu-mono font-bold text-lg capitalize text-spanish-gray leading-6 text-center select-none active:text-creator-black group-active:text-creator-black',
  },
};

export type TertiaryButtonColor = ColorSet<
  | 'taupe-gray'
  | 'electric-lime'
  | 'ultramarine-blue'
  | 'white'
  | 'spanish-gray'
  | 'granite-gray'
>;

export interface TertiaryButtonTheme {
  text: string;
}

export const tertiaryButtonThemes: Record<
  TertiaryButtonColor,
  TertiaryButtonTheme
> = {
  'taupe-gray': {
    text: tertiaryTextWith(
      'text-taupe-gray',
      'text-taupe-gray',
      'text-white',
      'drop-shadow-creator-pink'
    ),
  },
  'granite-gray': {
    text: tertiaryTextWith(
      'text-granite-gray',
      'text-granite-gray',
      'text-white',
      'drop-shadow-creator-pink'
    ),
  },
  'electric-lime': {
    text: tertiaryTextWith(
      'text-electric-lime',
      'text-electric-lime',
      'text-white',
      'drop-shadow-creator-yellow'
    ),
  },
  'ultramarine-blue': {
    text: tertiaryTextWith(
      'text-ultramarine-blue',
      'text-ultramarine-blue',
      'text-white',
      'drop-shadow-creator-pink'
    ),
  },
  white: {
    text: tertiaryTextWith(
      'text-white',
      'text-chinese-silver',
      'text-taupe-gray',
      'drop-shadow-none'
    ),
  },
  'spanish-gray': {
    text: tertiaryTextWith(
      'text-spanish-gray',
      'text-spanish-gray',
      'text-white',
      'drop-shadow-creator-pink'
    ),
  },
};

function tertiaryTextWith(
  textColor: string,
  hoverTextColor: string,
  activeTextColor: string,
  dropShadow: string
) {
  return `font-apercu-mono leading-5 ${textColor} text-center no-underline select-none first-letter:uppercase hover:${hoverTextColor} group-hover:${hoverTextColor} hover:underline group-hover:underline hover:${dropShadow} group-hover:${dropShadow} active:drop-shadow-none group-active:drop-shadow-none group-active:no-underline active:no-underline active:${activeTextColor} group-active:${activeTextColor} focus:outline-none`;
}

export type ProfileButtonColor = ColorSet<'white'>;

export interface ProfileButtonTheme {
  background: (disabled: boolean) => string;
  text: (disabled: boolean) => string;
  iconStyle: (disabled: boolean) => string;
}

export const profileButtonThemes: Record<
  ProfileButtonColor,
  ProfileButtonTheme
> = {
  white: {
    background: (disabled) =>
      classNames(
        'group rounded-standard p-3 border border-white bg-transparent',
        {
          'opacity-50 cursor-default': disabled,
          'hover:bg-white active:bg-raisin-black active:border-raisin-black cursor-pointer':
            !disabled,
        }
      ),
    text: (disabled) =>
      classNames(
        'font-du-bois font-bold text-sm uppercase leading-4 tracking-widest mt-[2px] grow text-white',
        {
          'group-hover:text-creator-black group-active:text-white cursor-pointer':
            !disabled,
          'cursor-default': disabled,
        }
      ),
    iconStyle: (disabled) =>
      classNames('grow-0 text-white absolute top-0 left-0', {
        'group-hover:text-creator-black group-active:text-white cursor-pointer':
          !disabled,
        'cursor-default': disabled,
      }),
  },
};
