import type { ICategory } from '@/types/category.types';
import CategoryStatsCard from '@/ui/CategoryStatsCard/CategoryStatsCard';

interface ICategoriesListProps {
  allTasksCount: number;
  categories: ICategory[];
}

const CategoriesList = ({
  allTasksCount,
  categories,
}: ICategoriesListProps) => {
  return (
    <div className="mt-6 w-full">
      <p className="text-xs font-semibold text-[#7A7669] uppercase">
        по категориям
      </p>
      <div className="mt-2.5 w-full overflow-hidden rounded-2xl border border-[#E2E0D8] bg-[#FFFFFF]">
        {categories.map((category, i) => (
          <CategoryStatsCard
            key={category.id}
            allTasksCount={allTasksCount}
            category={category}
            border={i !== categories.length - 1 ? 'bottom' : 'none'}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
