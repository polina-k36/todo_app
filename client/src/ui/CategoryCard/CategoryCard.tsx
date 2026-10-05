import EditIcon from '@/assets/icons/icon-edit.svg?react';
import DeleteIcon from '@/assets/icons/icon-delete.svg?react';

interface IBaseCategoryCardProps {
  title: string;
  iconPath: string;
  tasksCount: number;
  color: string;
  preview: false;
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
}

interface IPreviewCategoryCardProps {
  title: string;
  iconPath: string;
  tasksCount?: never;
  color: string;
  preview: true;
  onClickEditBtn?: never;
  onClickDeleteBtn?: never;
}

type ICategoryCardProps = IBaseCategoryCardProps | IPreviewCategoryCardProps;

const getFormText = (count: number): string => {
  if (count === 1) return 'задача';
  if (count >= 2 && count <= 4) return 'задачи';
  return 'задач';
};

const CategoryCard = ({
  title,
  iconPath,
  tasksCount,
  color,
  preview,
  onClickEditBtn,
  onClickDeleteBtn,
}: ICategoryCardProps) => {
  const colorCategory = color;
  const colorBackground = `color-mix(in srgb, ${colorCategory} 10%, transparent)`;

  return (
    <div
      className={`flex min-h-15 w-full items-center justify-between gap-2.5 rounded-xl bg-[#FFFFFF] p-3 ${preview ? 'bg-[#F5F4F0]' : 'transition-[background] duration-400 hover:bg-[#F5F4F0]'} group`}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl [&_img]:h-6 [&_img]:w-6"
        style={{ background: `${colorBackground}` }}
      >
        <img src={iconPath} />
      </div>
      <div className="flex-1">
        <div
          className="text-base font-semibold text-[#1A1917] capitalize"
          style={{
            color: `${preview ? color : ''}`,
          }}
        >
          {title}
        </div>
        <div className="text-sm font-normal text-[#7A7669]">
          {preview
            ? 'Предпросмотр'
            : `${tasksCount} ${getFormText(tasksCount)}`}
        </div>{' '}
        {/*поменять задачи на правильное использование*/}
      </div>
      {preview ? null : (
        <>
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: `${colorCategory}` }}
          ></div>
          <div className="flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100">
            <button
              className="flex cursor-default items-center justify-center rounded-md bg-[transparent] p-1 text-[#7A7669] [border:none] [transition:color_0.4s_background_0.4s_visibility_0.4s] hover:bg-[#E2E0D8] hover:text-[#1A1917] [&_svg]:h-4 [&_svg]:w-4"
              onClick={onClickEditBtn}
            >
              <EditIcon />
            </button>
            <button
              className="flex cursor-default items-center justify-center rounded-md bg-[transparent] p-1 text-[#7A7669] [border:none] [transition:color_0.4s_background_0.4s_visibility_0.4s] hover:bg-[#E2E0D8] hover:bg-[color-mix(in_srgb,_#DC2626_10%,_transparent)] hover:text-[#1A1917] hover:text-[#DC2626] [&_svg]:h-4 [&_svg]:w-4"
              onClick={onClickDeleteBtn}
            >
              <DeleteIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryCard;
