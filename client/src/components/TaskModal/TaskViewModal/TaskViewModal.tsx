import Modal from '@/components/Modal/Modal';
import { formatDate } from '@/utils/format-date';
import EditIcon from '@/assets/icons/icon-edit.svg?react';
import DeleteIcon from '@/assets/icons/icon-delete.svg?react';
import CalendarIcon from '@/assets/icons/icon-calendar.svg?react';
import Button from '@/ui/Button/Button';
import Checkbox from '@/ui/Checkbox/Checkbox';
import type { ITask } from '@/types/task.types';
import TaskInfoCard from '@/ui/TaskInfoCard/TaskInfoCard';

import StatusCard from '@/ui/StatusCard/StatusCard';
import PriorityCard from '@/ui/PriorityCard/PriorityCard';
interface ITaskViewModalProps {
  task: ITask;
  onCloseModal: () => void;
  onClickEditBtn: (id: number) => void;
  onClickDeleteBtn: (id: number) => void;
  toggleStatusTask: (id: number, checked: boolean) => void;
}

const TaskViewModal = ({
  task,
  onCloseModal,
  onClickEditBtn,
  toggleStatusTask,
  onClickDeleteBtn,
}: ITaskViewModalProps) => {
  const changeStatusTask = (checked: boolean) => {
    toggleStatusTask(task.id, checked);
  };

  const colorCategory = task.category
    ? (task.category.color ?? '#4F46E5')
    : '#4F46E5';
  const colorBackground = `color-mix(in srgb, ${colorCategory} 10%, transparent)`;
  return (
    <Modal
      size="big"
      header={
        <div className="relative flex min-w-0 flex-1 items-start justify-start gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl [&_img]:h-6"
            style={{ background: colorBackground }}
          >
            <img src={task.category?.iconKey} alt="" />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="text-sm font-semibold uppercase"
              style={{ color: colorCategory }}
            >
              {task.category?.name}
            </div>
            {task.createdAt ? (
              <div className="mt-0.5 text-sm font-normal text-[#7A7669]">
                создано {formatDate(task.createdAt, false)}
              </div>
            ) : null}
          </div>
          <button
            className="absolute top-[-0.5rem] right-0 flex cursor-pointer items-center justify-center rounded-md bg-[transparent] p-1 text-[#7A7669] transition-all duration-300 [border:none] hover:text-[#1A1917] [&_svg]:h-5 [&_svg]:w-5"
            onClick={() => onClickEditBtn(task.id)}
          >
            <EditIcon />
          </button>
        </div>
      }
      footer={
        <div className="flex w-full items-center justify-between">
          <Button
            size="modal-btn"
            variant="transparent"
            color="#DC2626"
            onClick={() => onClickDeleteBtn(task.id)}
          >
            <DeleteIcon className="h-5 w-5" /> <p className="ml-2.5">Удалить</p>
          </Button>
          <Button
            size="modal-btn"
            variant="accent"
            onClick={() => onClickEditBtn(task.id)}
          >
            <EditIcon className="h-5 w-5" />{' '}
            <p className="ml-2.5">Редактировать</p>
          </Button>
        </div>
      }
      onCloseModal={onCloseModal}
    >
      <div className="w-full">
        <div className="flex items-start justify-start gap-2.5">
          <Checkbox
            status={task.status ?? 'TODO'}
            onToggleStatusTask={changeStatusTask}
          />

          <div className="min-w-0 flex-1">
            <p
              className={`text-xl font-bold text-[#1A1917] ${task.status === 'DONE' ? 'line-through' : ''}`}
            >
              {task.title}
            </p>
            <p className="mt-2.5 text-sm font-normal text-[#7A7669]">
              {task.description}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <TaskInfoCard title="статус">
            <StatusCard status={task.status ?? 'TODO'} />
          </TaskInfoCard>

          <TaskInfoCard title="приоритет">
            <PriorityCard priority={task.priority} />
          </TaskInfoCard>

          <TaskInfoCard title="срок">
            {task.dueDate ? (
              <div
                className={`flex items-center justify-start gap-2.5 text-sm font-medium text-[#7A7669] [&_svg]:h-4 [&_svg]:w-4 ${new Date(task.dueDate) < new Date() && task.status !== 'DONE' ? 'text-[#DC2626]' : ''}`}
              >
                <CalendarIcon />
                <p>{task.dueDate ? formatDate(task.dueDate) : '-'}</p>
              </div>
            ) : (
              <div className="flex items-center justify-start gap-2.5 text-sm font-medium text-[#7A7669] [&_svg]:h-4 [&_svg]:w-4">
                <CalendarIcon />
                <p>{task.dueDate ? formatDate(task.dueDate) : '-'}</p>
              </div>
            )}
          </TaskInfoCard>

          <TaskInfoCard title="создана">
            {
              <div className="flex items-center justify-start gap-2.5 text-sm font-medium text-[#7A7669] [&_svg]:h-4 [&_svg]:w-4">
                <CalendarIcon />
                <p>{task.createdAt ? formatDate(task.createdAt) : '-'}</p>
              </div>
            }
          </TaskInfoCard>
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
