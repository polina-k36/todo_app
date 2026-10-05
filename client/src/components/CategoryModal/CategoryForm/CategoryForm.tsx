import CategoryCard from '@/ui/CategoryCard/CategoryCard';
import { useState } from 'react';
import ModalInput from '@/ui/ModalFields/ModalInput';
import Button from '@/ui/Button/Button';
import ColorButton from '@/ui/ColorButton/ColorButton';
import type { ICategory } from '@/types/category.types';

interface ICategoryFormProps {
  category?: ICategory;
  onSubmitForm: (data: FormData) => void;
}

const CategoryForm = ({ category, onSubmitForm }: ICategoryFormProps) => {
  const [title, setTitle] = useState(category?.name ?? '');
  const [color, setColor] = useState(category?.color ?? '#4F46E5');
  const [icon, setIcon] = useState<File | null>(null);
  const [iconUrl] = useState<string | null>(category?.iconKey ?? null);

  const colors = [
    { id: 1, value: '#4F46E5' },
    { id: 2, value: '#7C3AED' },
    { id: 3, value: '#DB2777' },
    { id: 4, value: '#DC2626' },
    { id: 5, value: '#D97706' },
    { id: 6, value: '#059669' },
    { id: 7, value: '#0369A1' },
    { id: 8, value: '#0891B2' },
    { id: 9, value: '#374151' },
    { id: 10, value: '#6B7280' },
  ];

  const submitData = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');

    const data = new FormData();
    data.append('name', title);
    data.append('color', color);
    if (icon) {
      data.append('icon', icon);
    }

    onSubmitForm(data);
  };

  return (
    <form
      id="category-form"
      className="flex w-full flex-col justify-center gap-4"
      onSubmit={submitData}
    >
      <CategoryCard
        preview={true}
        title={title === '' ? 'Название' : title}
        iconPath={icon ? URL.createObjectURL(icon) : (iconUrl ?? '')}
        color={color}
      />
      <ModalInput
        name="title"
        label="название*"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <ModalInput
        name="icon"
        label="иконка"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setIcon(file);
          } else {
            setIcon(null);
          }
        }}
      />

      <div className="flex w-full flex-wrap items-center justify-start gap-2.5">
        {colors.map((colorInfo) => (
          <ColorButton
            key={colorInfo.id}
            color={colorInfo.value}
            activeColor={color}
            onClickBtn={() => setColor(colorInfo.value)}
          />
        ))}
        <ModalInput
          name="color"
          type="color"
          color={color}
          style={{
            padding: '10px',
            height: '28px',
            width: '28px',
            background:
              'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)',
          }}
          onChange={(e) => setColor(e.currentTarget.value)}
        />
      </div>

      <div className="flex w-full items-center justify-between gap-5">
        <Button
          size="max"
          variant="transparent"
          onClick={(e) => {
            e.preventDefault();
            console.log('ads');
          }}
        >
          Отмена
        </Button>
        <Button form="category-form" type="submit" size="max" variant="accent">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
