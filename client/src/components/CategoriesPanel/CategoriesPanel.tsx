import CategoryButton from '@/ui/CategoryButton/CategoryButton';
import type { ICategory } from '@/types/category.types';
import Button from '@/ui/Button/Button';

interface ICategoriesPanelProps {
  countAllTasks: number;
  activeCategoryId: number;
  categories: ICategory[];
  changeCategory: (id: number) => void;
  onClickSettings: () => void;
}

const CategoriesPanel = ({
  categories,
  countAllTasks,
  activeCategoryId,
  changeCategory,
  onClickSettings,
}: ICategoriesPanelProps) => {
  return (
    <div className="mt-6 flex w-full min-w-0 items-center gap-2 overflow-hidden">
      <CategoryButton
        activeId={activeCategoryId}
        onClickCategory={changeCategory}
        id={0}
        title="Все"
        count={countAllTasks}
        variant="all"
      />
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <CategoryButton
            activeId={activeCategoryId}
            onClickCategory={changeCategory}
            id={category.id}
            key={category.id}
            title={category.name}
            icon={category.iconKey}
            count={category.tasksCount}
            color={category.color}
          />
        ))}
      </div>
      <Button size="navigate" variant="transparent" onClick={onClickSettings}>
        +
      </Button>
    </div>
  );
};

export default CategoriesPanel;
