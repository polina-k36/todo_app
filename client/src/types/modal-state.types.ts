export type WelcomeModalState =
  | { type: 'login' }
  | { type: 'register' }
  | {
      type: 'message';
      title: string;
      message: string;
    }
  | null;

export type MainModalState =
  | {
      type: 'message';
      title: string;
      message: string;
    }
  | {
      type: 'task';
      taskId: number;
    }
  | {
      type: 'task-edit';
      taskId: number;
      prevModal: {
        type: 'task';
        taskId: number;
      } | null;
    }
  | { type: 'task-create' }
  | { type: 'categories' }
  | {
      type: 'category-edit';
      categoryId: number;
    }
  | { type: 'category-create' }
  | null;

export type AccountModalState =
  | { type: 'user-edit'; userId: number }
  | {
      type: 'message';
      title: string;
      message: string;
    }
  | null;
