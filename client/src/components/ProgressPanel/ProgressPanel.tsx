import ProgressBar from '@/ui/ProgressBar/ProgressBar';

const ProgressPanel = ({
  all,
  completed,
}: {
  all: number;
  completed: number;
}) => {
  const percent =
    typeof Math.round((completed / all) * 100) === 'number' &&
    Math.round((completed / all) * 100) !== Infinity &&
    !isNaN(Math.round((completed / all) * 100))
      ? Math.round((completed / all) * 100)
      : 0;

  return (
    <div className="mt-6 w-full rounded-2xl border border-[#E2E0D8] bg-[#FFFFFF] p-4 sm:mt-8 sm:p-5">
      <div className="mb-2.5 flex items-center justify-between text-sm font-semibold text-[#1A1917] [&_span]:font-bold [&_span]:text-[#4F46E5]">
        <p>Общий прогресс</p>
        <span>{percent}%</span>
      </div>
      <ProgressBar percent={percent} />
      <div className="mt-[5px] text-xs font-normal text-[#7A7669]">{`${completed} из ${all} задач выполнено`}</div>
    </div>
  );
};

export default ProgressPanel;
