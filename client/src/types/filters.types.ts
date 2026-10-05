import type { IDueDateRange } from '@/utils/create-date';

export interface IDueDateInfo {
  name: string;
  range: IDueDateRange | null;
}

export interface IFiltersTask {
  status: string | null;
  priority: string | null;
  dueDate: IDueDateRange | null;
  sort: string;
  search: string;
}

export interface IApiFiltersTasks {
  status: string | null;
  priority: string | null;
  dueDateFrom: string | null;
  dueDateTo: string | null;
  sort: string;
  search: string;
}
