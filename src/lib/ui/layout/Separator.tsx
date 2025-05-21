interface Props {
  text?: string;
}

export function Separator({text}: Props) {
  return (
    <div
      className={
        'w-full text-outer-space font-apercu-mono text-lg flex items-center gap-4'
      }
    >
      <Line/>
      {text && (
        <>
          {text}
          <Line/>
        </>
      )}
    </div>
  );
}

function Line() {
  return <hr className={'flex-1 border-raisin-black'}/>;
}
