import {SyntheticEvent, useEffect, useState} from 'react';
import {CreatorTokenAssets} from './creatorTokenAssets';

interface TokenLogoDimensionsProps {
  layout: 'fixed';
  width: number;
  height: number;
}

interface TokenLogoResponsiveProps {
  layout: 'responsive';
}

export type TokenLogoLayoutProps =
  | TokenLogoDimensionsProps
  | TokenLogoResponsiveProps;

export type TokenLogoProps = {
  tokenId: string;
} & TokenLogoLayoutProps;

export function TokenLogo({tokenId, ...rest}: TokenLogoProps) {
  const [error, setError] = useState<
    SyntheticEvent<HTMLImageElement> | undefined
  >(undefined);

  const src = CreatorTokenAssets.logo(tokenId);
  const fallbackSrc = `/nologo.png`;

  useEffect(() => {
    setError(undefined);
  }, [src]);

  const description = `${tokenId} logo`;

  const dimensionsProps =
    rest.layout === 'fixed' ? {width: rest.width, height: rest.height} : {};
  const responsiveProps =
    rest.layout === 'responsive'
      ? {
        className: 'object-contain',
      }
      : {};

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={description}
      title={description}
      {...dimensionsProps}
      {...responsiveProps}
      onError={setError}
    />
  );
}
