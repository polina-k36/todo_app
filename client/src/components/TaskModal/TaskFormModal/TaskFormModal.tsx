import Modal from '@/components/Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import './task-form-modal.scss';
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

type ITaskFormModalProps =
    | IEditTaskFormModalProps
    | ICreateTaskFormModalProps; 

//продумать создание кнопки отмены при открытии модалки через другую модалку - 
//чтобы при нажатии отмена нас возвращало на старую модалку если не было модалки то мы просто закрываем окно и все

const TaskFormModal = ({taskId, mode, onCloseModal, onClickCancelBtn, onClickDeleteBtn, submitForm}: ITaskFormModalProps) => {

    const [task, setTask] = useState<ITask | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onSubmitForm = (data: IEditTask | ICreateTask) => {
        if (mode === 'edit') {
            submitForm(taskId, data as IEditTask);
        } else {
            submitForm(data);
        }
    }
    
    useEffect(() => {
        if (taskId !== undefined) {
            getTaskById(taskId)
                .then(data => {setTask(data.data); setLoading(false)})
                .catch(() => setError(true));
        }
    }, [taskId]);
    
    
    
    const colorCategory = (task && task.category) ? task.category.color ?? '#4F46E5' : '#4F46E5';
    const colorBackground =  `color-mix(in srgb, ${colorCategory} 10%, transparent)`;

    const header = mode === 'create' 
    ? <div className="task-form-modal__title">Новая задача</div>
    : <div className="modal-task__header">
          <div className="modal-task__header_icon" style={{background: colorBackground}}><img src={task?.category?.iconKey} alt=""/></div>         
          <div className="modal-task__header_info">
              <div className="modal-task__header_title" style={{color: colorCategory}}>{task?.category?.name}</div>
              {(task?.createdAt) ? <div className="modal-task__header_subtitle">создано {formatDate(task.createdAt, false)}</div> : null}                
          </div>     
      </div>;

    const footer = mode === 'edit' 
    ? <div className="task-form-modal__btns">
          <Button size='modal-btn' variant='transparent' color='#DC2626' onClick={() => onClickDeleteBtn(taskId)}>
                  <DeleteIcon className="modal-task__footer_icon"/> <p className="modal-task__footer_btn">Удалить</p>
          </Button>
          <div className="task-form-modal__btns-right">                    
              <Button size='modal-btn' variant='transparent' onClick={onClickCancelBtn ?? onCloseModal} color='#7A7669'>Отмена</Button>
              <Button type='submit' form='task-form' size='modal-btn' variant='accent'>Сохранить</Button>
          </div>
      </div>
      : undefined;      

    return (
        <Modal header={header} size={mode === 'create' ? 'medium' : 'big'}
               onCloseModal={onCloseModal}
               footer={footer}>
            {
                (loading && mode === 'edit')
                ? <div>Загрузка....</div>
                : <TaskForm task={task} onSubmitForm={onSubmitForm}/>
            }
            {
                mode === 'create' 
                ? <div className="task-form-modal__btns">
                    <Button size='max' variant='transparent' onClick={onCloseModal}>Отмена</Button>
                    <Button type='submit' form='task-form' size='max' variant='accent'>Создать</Button>
                  </div>
                : null
            }
        </Modal>
    );
};

export default TaskFormModal;