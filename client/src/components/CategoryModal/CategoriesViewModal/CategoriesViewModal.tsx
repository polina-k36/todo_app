import Modal from '@/components/Modal/Modal';
import Button from '@/ui/Button/Button';
import type { ICategory } from '@/types/category.types';
import CategoryCard from '@/ui/CategoryCard/CategoryCard';

interface ICategoriesViewModalProps {
  categories: ICategory[];
  onCloseModal: () => void;
  onClickAddBtn: () => void;
  onClickEditBtn: (id: number) => void;
  onClickDeleteBtn: (id: number) => void;
  onCategoryChanged: () => void;
}

const CategoriesViewModal = ({
  categories,
  onCloseModal,
  onClickAddBtn,
  onClickEditBtn,
  onClickDeleteBtn,
  onCategoryChanged,
}: ICategoriesViewModalProps) => {
  return (
    <Modal
      size="medium"
      bodyPadding="12px"
      onCloseModal={onCloseModal}
      header={
        <div className="">
          <div className="text-lg font-bold text-[#1A1917]">Категории</div>
          <div className="text-sm font-normal text-[#7A7669]">6 категорий</div>
        </div>
      }
      footer={
        <Button size="max" variant="dashed" onClick={onClickAddBtn}>
          + Добавить категорию
        </Button>
      }
    >
      {categories!.map((category) => (
        <CategoryCard
          key={category.id}
          preview={false}
          title={category.name}
          iconPath={category.iconKey ?? ''}
          color={category.color ?? '#4F46E5'}
          tasksCount={category.tasksCount ?? 0}
          onClickDeleteBtn={() => {
            onClickDeleteBtn(category.id);
            onCategoryChanged();
          }}
          onClickEditBtn={() => {
            onClickEditBtn(category.id);
            onCategoryChanged();
          }}
        />
      ))}
    </Modal>
  );
};

export default CategoriesViewModal;
