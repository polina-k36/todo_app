export type TaskPriority = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus =
  'TODO' | 'IN_PROGRESS' | 'ON_HOLD' | 'DONE' | 'CANCELLED';

export interface ICategoryTask {
  //вынести или скооперировать с типом категории
  id: number;
  name: string;
  iconKey?: string;
  color?: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  category: ICategoryTask | null;
  createdAt: string;
}

export interface IEditTask {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  categoryId: number | null;
}

export interface ICreateTask {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
  categoryId?: number | null;
}

export interface IGetTasksResponse {
  success: true;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ITask[];
}

export interface IGetTaskResponse {
  success: true;
  data: ITask;
}

export interface IStatsTask {
  total: number;
  completed: number;
  overdue: number;
  inProgress: number;
}

export enum TaskPriorityEnum {
  NONE = 'Отсутствует',
  LOW = 'Низкий',
  MEDIUM = 'Средний',
  HIGH = 'Высокий',
}

export enum TaskStatusEnum {
  TODO = 'К выполнению',
  IN_PROGRESS = 'В процессе',
  ON_HOLD = 'Заморожен',
  DONE = 'Сделано',
  CANCELLED = 'Закрыто',
}
