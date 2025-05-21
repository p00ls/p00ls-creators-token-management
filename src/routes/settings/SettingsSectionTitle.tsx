import { PropsWithChildren } from 'react';

export function SettingsSectionTitle({ children }: PropsWithChildren) {
  return (
    <div
      className={
        'font-du-bois font-bold uppercase text-granite-gray text-sm tracking-widest'
      }
    >
      {children}
    </div>
  );
}
