import { TaskStatusEnum, type TaskStatus } from '@/types/task.types';

export const getStatusByRUName = (
  nameStatus: string | null,
): TaskStatus | undefined => {
  switch (nameStatus) {
    case TaskStatusEnum.CANCELLED:
      return 'CANCELLED';

    case TaskStatusEnum.DONE:
      return 'DONE';

    case TaskStatusEnum.ON_HOLD:
      return 'ON_HOLD';

    case TaskStatusEnum.IN_PROGRESS:
      return 'IN_PROGRESS';

    case TaskStatusEnum.TODO:
      return 'TODO';
    case null:
      return;
  }
};
//придумать и заменит undefined уву то чтобы не было багов
export const getRUNameByStatus = (
  status: TaskStatus | undefined | null,
): { name: string; color: string } | undefined => {
  switch (status) {
    case 'CANCELLED':
      return { name: TaskStatusEnum.CANCELLED, color: '#DC2626' };

    case 'DONE':
      return { name: TaskStatusEnum.DONE, color: '#059669' };

    case 'ON_HOLD':
      return { name: TaskStatusEnum.ON_HOLD, color: '#0369A1' };

    case 'IN_PROGRESS':
      return { name: TaskStatusEnum.IN_PROGRESS, color: '#7C3AED' };

    case 'TODO':
      return { name: TaskStatusEnum.TODO, color: '#4F46E5' };

    case undefined:
      return;

    case null:
      return;

    default:
      return;
  }
};
