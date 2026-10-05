interface ICategoryButtonProps {
  id?: number;
  icon?: string | undefined;
  title: string;
  count?: number;
  variant?: 'all';
  color?: string;
  onClickCategory?: (id: number) => void;
  activeId?: number;
}

const CategoryButton = ({
  id,
  icon,
  title,
  count,
  variant,
  activeId,
  color,
  onClickCategory,
}: ICategoryButtonProps) => {
  const colorCategory = color ?? '#4F46E5';
  const colorBackground = `color-mix(in srgb, ${colorCategory} 10%, transparent)`;

  return (
    <div
      data-id={id}
      className={`flex w-fit cursor-pointer items-center justify-around gap-2.5 rounded-lg px-3 py-1.5`}
      style={{
        background:
          activeId !== undefined && activeId === id
            ? colorCategory
            : colorBackground,
        color:
          activeId !== undefined && activeId === id ? '#FFFFFF' : colorCategory,
      }}
      onClick={(e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (id && onClickCategory) onClickCategory(+id);
      }}
    >
      {variant !== 'all' ? <img src={icon} alt="" className="h-4 w-4" /> : null}
      <p className="text-sm font-semibold">{title}</p>
      {count ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-[50%] bg-[rgba(0,0,0,0.08)] text-xs font-semibold">
          {count}
        </div>
      ) : null}
    </div>
  );
};

export default CategoryButton;
