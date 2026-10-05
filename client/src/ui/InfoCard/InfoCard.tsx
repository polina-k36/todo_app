interface IInfoCardProps {
  title: string;
  value: number;
  colorValue: string;
  subValue?: string;
}

const InfoCard = ({ title, value, subValue, colorValue }: IInfoCardProps) => {
  return (
    <div className="min-h-24 w-full rounded-xl border border-[#E2E0D8] bg-[#FFFFFF] p-4 sm:min-h-28">
      <p className="text-sm font-semibold text-[#7A7669] uppercase">{title}</p>
      <div
        className={`mt-[5px] text-3xl leading-9 font-bold [&_span]:text-sm [&_span]:font-medium [&_span]:text-[#059669]`}
        style={{ color: colorValue }}
      >
        {value}
        {subValue ? <span>{' ' + subValue}</span> : null}
      </div>
    </div>
  );
};

export default InfoCard;
