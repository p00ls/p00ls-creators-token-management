import {Functions} from '../../functions/functions';
import {CheckboxOffSvg, CheckboxOnSvg, CheckSolidSvg, CircleSvg, P00lsGradientName,} from '../';
import classNames from 'classnames';
import {useCallback} from 'react';

export type CheckboxOnIdentifiedChange = (event: {
  value: boolean;
  id: string;
}) => void;

interface Props {
  id?: string;
  onChange?: (value: boolean) => void;
  onIdentifiedChange?: CheckboxOnIdentifiedChange;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  size?: SizeVariant;
  checkedGradient?: P00lsGradientName;
  unCheckedGradient?: P00lsGradientName;
  shape?: 'round' | 'square';
}

type SizeVariant = 'md';

const sizeVariantClasses: Record<SizeVariant, string> = {
  md: 'w-5 h-5',
};

export function Checkbox({
                           id = 'checkbox',
                           onChange,
                           onIdentifiedChange,
                           checked,
                           disabled = false,
                           className,
                           checkedGradient,
                           unCheckedGradient,
                           size = 'md',
                           shape = 'round',
                         }: Props) {
  const onClick = useCallback(() => {
    const newValue = !checked;
    if (onIdentifiedChange) {
      onIdentifiedChange({id, value: newValue});
    }
    if (onChange) {
      onChange(newValue);
    }
  }, [checked, id, onChange, onIdentifiedChange]);

  const Svg = getSvg();

  const gradientProps = getGradientProps();
  return (
    <div
      className={classNames(className, 'inline-block', {
        'text-outer-space': disabled,
        'text-granite-gray': !disabled,
      })}
      onClick={disabled ? Functions.noop : onClick}
    >
      <Svg className={sizeVariantClasses[size]} gradientName={gradientProps}/>
    </div>
  );

  function getSvg() {
    if (checked && shape === 'round') {
      return CheckSolidSvg;
    }
    if (!checked && shape === 'round') {
      return CircleSvg;
    }
    if (checked && shape === 'square') {
      return CheckboxOnSvg;
    }
    return CheckboxOffSvg;
  }

  function getGradientProps() {
    if (checked && checkedGradient) {
      return checkedGradient;
    }
    if (!checked && unCheckedGradient) {
      return unCheckedGradient;
    }
    return undefined;
  }
}
