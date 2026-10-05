import Modal from '@/components/Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import Button from '@/ui/Button/Button';
import type { ICreateTask, IEditTask, ITask } from '@/types/task.types';
import { formatDate } from '@/utils/format-date';

import DeleteIcon from '@/assets/icons/icon-delete.svg?react';
import { useEffect, useState } from 'react';
import { getTaskById } from '@/api/tasks';

interface IEditTaskFormModalProps {
  mode: 'edit';
  taskId: number;
  onCloseModal: () => void;
  onClickCancelBtn?: () => void;
  submitForm: (id: number, task: IEditTask) => void;
  onClickDeleteBtn: (id: number) => void;
}

interface ICreateTaskFormModalProps {
  mode: 'create';
  taskId?: never;
  onCloseModal: () => void;
  onClickCancelBtn?: () => void;
  onClickDeleteBtn?: never;
  submitForm: (task: ICreateTask) => void;
}
//передача вссего таска а не только ID

type ITaskFormModalProps = IEditTaskFormModalProps | ICreateTaskFormModalProps;

//продумать создание кнопки отмены при открытии модалки через другую модалку -
//чтобы при нажатии отмена нас возвращало на старую модалку если не было модалки то мы просто закрываем окно и все

const TaskFormModal = ({
  taskId,
  mode,
  onCloseModal,
  onClickCancelBtn,
  onClickDeleteBtn,
  submitForm,
}: ITaskFormModalProps) => {
  const [task, setTask] = useState<ITask | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  //TODO const [error, setError] = useState(false);

  const onSubmitForm = (data: IEditTask | ICreateTask) => {
    if (mode === 'edit') {
      submitForm(taskId, data as IEditTask);
    } else {
      submitForm(data);
    }
  };

  useEffect(() => {
    if (taskId !== undefined) {
      getTaskById(taskId).then((data) => {
        setTask(data.data);
        setLoading(false);
      });
      // .catch(() => setError(true));
    }
  }, [taskId]);

  const colorCategory =
    task && task.category ? (task.category.color ?? '#4F46E5') : '#4F46E5';
  const colorBackground = `color-mix(in srgb, ${colorCategory} 10%, transparent)`;

  const header =
    mode === 'create' ? (
      <div className="mt-2 text-xl font-bold text-[#1A1917]">Новая задача</div>
    ) : (
      <div className="relative flex min-w-0 flex-1 items-start justify-start gap-2.5">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl [&_img]:h-6"
          style={{ background: colorBackground }}
        >
          <img src={task?.category?.iconKey} alt="" />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="text-sm font-semibold uppercase"
            style={{ color: colorCategory }}
          >
            {task?.category?.name}
          </div>
          {task?.createdAt ? (
            <div className="mt-0.5 text-sm font-normal text-[#7A7669]">
              создано {formatDate(task.createdAt, false)}
            </div>
          ) : null}
        </div>
      </div>
    );

  const footer =
    mode === 'edit' ? (
      <div className="mt-5 flex w-full items-center justify-between gap-5">
        <Button
          size="modal-btn"
          variant="transparent"
          color="#DC2626"
          onClick={() => onClickDeleteBtn(taskId)}
        >
          <DeleteIcon className="h-5 w-5" /> <p className="ml-2.5">Удалить</p>
        </Button>
        <div className="flex items-center justify-center gap-2.5">
          <Button
            size="modal-btn"
            variant="transparent"
            onClick={onClickCancelBtn ?? onCloseModal}
            color="#7A7669"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            form="task-form"
            size="modal-btn"
            variant="accent"
          >
            Сохранить
          </Button>
        </div>
      </div>
    ) : undefined;

  return (
    <Modal
      header={header}
      size={mode === 'create' ? 'medium' : 'big'}
      onCloseModal={onCloseModal}
      footer={footer}
    >
      {loading && mode === 'edit' ? (
        <div>Загрузка....</div>
      ) : (
        <TaskForm task={task} onSubmitForm={onSubmitForm} />
      )}
      {mode === 'create' ? (
        <div className="mt-5 flex w-full items-center justify-between gap-5">
          <Button size="max" variant="transparent" onClick={onCloseModal}>
            Отмена
          </Button>
          <Button type="submit" form="task-form" size="max" variant="accent">
            Создать
          </Button>
        </div>
      ) : null}
    </Modal>
  );
};

export default TaskFormModal;
