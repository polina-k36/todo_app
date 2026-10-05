import type { ICategory } from '@/types/category.types';
import ProgressBar from '../ProgressBar/ProgressBar';

interface ICategoryStatsCardProps {
  allTasksCount: number;
  border: 'none' | 'bottom';
  category: ICategory;
}

const CategoryStatsCard = ({
  allTasksCount,
  category,
  border,
}: ICategoryStatsCardProps) => {
  const { name, iconKey, color, tasksCount } = category;

  const count = tasksCount ?? 0;

  const percent =
    typeof Math.round((count / allTasksCount) * 100) === 'number' &&
    Math.round((count / allTasksCount) * 100) !== Infinity &&
    !isNaN(Math.round((count / allTasksCount) * 100))
      ? Math.round((count / allTasksCount) * 100)
      : 0;

  const colorCategory = color ?? '#4F46E5';
  const colorBackground = `color-mix(in srgb, ${colorCategory} 10%, transparent)`;
  return (
    <div
      className={`flex w-full items-center justify-between gap-2.5 px-5 py-3.5 border-${border}`}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-xl [&_img]:h-5 [&_img]:w-5"
        style={{ background: `${colorBackground}` }}
      >
        <img src={iconKey} />
      </div>
      <div className="flex-1 text-sm font-semibold text-[#1A1917] capitalize">
        {name}
      </div>
      <div className="min-w-0 flex-1">
        <ProgressBar percent={percent} color={color} />
      </div>
      <div
        className="w-5 text-right text-xs font-bold"
        style={{ color: `${colorCategory}` }}
      >
        {count}
      </div>
    </div>
  );
};

export default CategoryStatsCard;
