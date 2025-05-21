import classNames from 'classnames';

interface Props {
  title: string;
  variant?: 'default' | 'white';
}

export function CardTitle({title, variant = 'default'}: Props) {
  return (
    <div
      className={classNames(
        'font-bold pb-6',
        {'text-white font-apercu-mono': variant === 'white'},
        {
          'text-granite-gray uppercase font-du-bois tracking-widest':
            variant === 'default',
        }
      )}
    >
      {title}
    </div>
  );
}
