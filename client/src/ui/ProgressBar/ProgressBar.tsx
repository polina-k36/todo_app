const ProgressBar = ({
  percent,
  color,
}: {
  percent: number;
  color?: string;
}) => {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded bg-[#E2E0D8]">
      <div
        className="absolute [inset:0_auto_0_0] rounded-[inherit] bg-[#4F46E5]"
        style={{
          width: `${percent}%`,
          backgroundColor: `${color ?? '#4F46E5'}`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
