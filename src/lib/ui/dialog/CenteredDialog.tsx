import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, MutableRefObject, PropsWithChildren } from 'react';

export enum CenteredDialogVariant {
  STANDARD,
  NO_PADDING,
}

type BgColor = 'chinese-black' | 'raisin-black';
const bgColorVariantClasses: Record<BgColor, string> = {
  'chinese-black': 'bg-chinese-black',
  'raisin-black': 'bg-raisin-black',
};

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  preventPanelOverflow?: boolean;
  initialFocus?: MutableRefObject<HTMLElement | null>;
  bgColor?: BgColor;
  variant?: CenteredDialogVariant;
}>;

export function CenteredDialog({
  open,
  onClose,
  children,
  preventPanelOverflow = true,
  initialFocus,
  bgColor = 'raisin-black',
  variant = CenteredDialogVariant.STANDARD,
}: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-creator-black bg-opacity-85 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className={classNames(
                  'relative transform rounded-lg text-left shadow-xl transition-all',
                  bgColorVariantClasses[bgColor],
                  {
                    'overflow-hidden': preventPanelOverflow,
                    'px-4 pb-4 pt-5 sm:my-8 sm:p-6':
                      variant === CenteredDialogVariant.STANDARD,
                    '': variant === CenteredDialogVariant.NO_PADDING,
                  }
                )}
              >
                <div className='sm:flex sm:items-start'>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
