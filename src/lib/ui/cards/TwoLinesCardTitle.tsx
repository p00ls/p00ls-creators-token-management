interface Props {
  topLabel: string;
  bottomLabel: string;
}

export function TwoLinesCardTitle({bottomLabel, topLabel}: Props) {
  return (
    <div
      className={
        'font-brik text-center text-3xl text-white uppercase leading-none'
      }
    >
      {topLabel}
      <br/>
      <span className={'font-du-bois leading-tight'}>{bottomLabel}</span>
    </div>
  );
}
