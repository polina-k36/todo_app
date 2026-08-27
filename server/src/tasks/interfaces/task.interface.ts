import { TaskPriorityEnum } from "../enums/task-priority.enum";
import { TaskStatusEnum } from "../enums/task-status.enum";

export interface ITask {
  id: number; 
  title: string; // алфавит
  description?: string; // ну может тоже
  status: TaskStatusEnum; // не по алфавиту лучше, я продумать может, хотя...
  priority: TaskPriorityEnum; // h m l n
  created_at: Date; //
  due_date?: Date; //
  updated_at: Date; //
  completed_at?: Date; //
  user_id: number; // не нужно ак ка это по 1 пользователю, пока нет админа нет смысла 
  category_id?: number; // не думаю что нужно?
}

