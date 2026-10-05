import CategoryButton from '@/ui/CategoryButton/CategoryButton';
import PriorityCard from '@/ui/PriorityCard/PriorityCard';
import CalendarIcon from '@/assets/icons/icon-calendar.svg?react';
import { formatDate } from '@/utils/format-date';
import EditIcon from '@/assets/icons/icon-edit.svg?react';
import DeleteIcon from '@/assets/icons/icon-delete.svg?react';

import type { ITask } from '@/types/task.types';
import Checkbox from '@/ui/Checkbox/Checkbox';
import StatusCard from '@/ui/StatusCard/StatusCard';

//выделить просроченные задачи

export interface ITaskCardProps {
  task: ITask;
  onClickCard: (id: number) => void;
  onClickEditBtn: (id: number) => void;
  onClickDeleteBtn: (id: number) => void;
  toggleStatusTask: (id: number, checked: boolean) => void;
}

const TaskCard = ({
  task,
  onClickCard,
  onClickEditBtn,
  toggleStatusTask,
  onClickDeleteBtn,
}: ITaskCardProps) => {
  const { id, title, description, status, priority, category, dueDate } = task;

  const changeStatusTask = (checked: boolean) => {
    toggleStatusTask(id, checked);
  };

  return (
    <div
      className={`group relative flex min-h-28 w-full items-start gap-3 rounded-xl bg-[#FFFFFF] p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:gap-5 ${task.status === 'DONE' ? 'brightness-95' : ''}`}
      onClick={(e) => {
        console.log(e.target);
        if (!(
          e.target instanceof HTMLButtonElement ||
          e.target instanceof HTMLSpanElement ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLImageElement ||
          e.target instanceof SVGElement ||
          e.target instanceof SVGPathElement
        ))
          onClickCard(task.id);
      }}
    >
      <Checkbox status={status} onToggleStatusTask={changeStatusTask} />

      <div className="min-w-0 flex-1">
        <p
          className={`text-base font-medium text-[#1A1917] ${task.status === 'DONE' ? 'line-through' : ''}`}
        >
          {title}
        </p>
        <p className="mt-1 [display:-webkit-box] overflow-hidden text-sm font-normal text-[#7A7669] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]">
          {description}
        </p>{' '}
        {/* ограничить описание по количеству символом и потом ... */}
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          {category ? (
            <CategoryButton
              title={category.name}
              color={category.color}
              icon={category.iconKey}
            />
          ) : null}
          <PriorityCard priority={priority} />
          {dueDate ? (
            <div
              className={`flex items-center justify-start gap-2.5 text-sm font-normal text-[#7A7669] [&_svg]:h-4 [&_svg]:w-4 ${new Date(dueDate) < new Date() && task.status !== 'DONE' ? 'text-[#DC2626]' : ''}`}
            >
              <CalendarIcon />
              <p>{formatDate(dueDate)}</p>
            </div>
          ) : null}
          {status !== 'DONE' ? <StatusCard status={status} /> : null}
        </div>
      </div>

      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <button
          className="flex cursor-default items-center justify-center rounded-md bg-[transparent] p-1 text-[#7A7669] [border:none] [transition:color_0.4s_background_0.4s_visibility_0.4s] hover:bg-[#E2E0D8] hover:text-[#1A1917] [&_svg]:h-4 [&_svg]:w-4"
          onClick={() => onClickEditBtn(id)}
        >
          <EditIcon />
        </button>
        <button
          className="flex cursor-default items-center justify-center rounded-md bg-[transparent] p-1 text-[#7A7669] [border:none] [transition:color_0.4s_background_0.4s_visibility_0.4s] hover:bg-[#E2E0D8] hover:bg-[color-mix(in_srgb,_#DC2626_10%,_transparent)] hover:text-[#1A1917] hover:text-[#DC2626] [&_svg]:h-4 [&_svg]:w-4"
          onClick={() => onClickDeleteBtn(id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
