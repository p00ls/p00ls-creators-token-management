import classNames from 'classnames';
import {GradientName} from '../colors';
import {Nft1FilledSvg} from '../svgs';

type RankPillSize = 'sm' | 'lg';

const ContainerSizeVariants: Record<RankPillSize, string> = {
  sm: 'w-8 h-8',
  lg: 'w-16 h-16',
};

const TextSizeVariants: Record<RankPillSize, string[]> = {
  sm: ['', 'text-lg', 'text-sm', 'text-sm', 'text-xs'],
  lg: ['', 'text-2xl', 'text-xl', 'text-lg', 'text-base'],
};

interface Props {
  gradientName: GradientName;
  position: number;
  sharp?: boolean;
  textColor?: string;
  size?: RankPillSize;
}

export function RankPill({
                           gradientName,
                           position,
                           sharp = true,
                           textColor = 'text-white',
                           size = 'lg',
                         }: Props) {
  const unsafePositionText = `${sharp ? '#' : ''}${position}`;
  const safePositionText =
    unsafePositionText.length > 4 ? '-' : unsafePositionText;
  const textSizeVariant = TextSizeVariants[size];
  const textClasses =
    textSizeVariant[
      Math.min(safePositionText.length, textSizeVariant.length - 1)
      ];
  return (
    <div
      className={classNames(
        'relative font-apercu-mono font-bold leading-6',
        ContainerSizeVariants[size]
      )}
    >
      <Nft1FilledSvg className={'w-full h-full'} gradientName={gradientName}/>
      <div
        className={classNames(
          `absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`,
          textColor,
          textClasses
        )}
      >
        {safePositionText}
      </div>
    </div>
  );
}
