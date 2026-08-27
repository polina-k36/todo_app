import Modal from '@/components/Modal/Modal'
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

import './task-view-modal.scss';
interface ITaskViewModalProps {
    task: ITask;
    onCloseModal: () => void;
    onClickEditBtn: (id: number) => void;
    onClickDeleteBtn: (id: number) => void;
    toggleStatusTask: (id: number, checked: boolean) => void;
}



const TaskViewModal = ({task, onCloseModal, onClickEditBtn, toggleStatusTask, onClickDeleteBtn}: ITaskViewModalProps) => {

    const changeStatusTask = (checked: boolean) => {
        toggleStatusTask(task.id, checked);
    }

    const colorCategory = (task.category) ? task.category.color ?? '#4F46E5' : '#4F46E5';
    const colorBackground =  `color-mix(in srgb, ${colorCategory} 10%, transparent)`;
    return (
        <Modal 
            size='big'
            header={
                    <div className="modal-task__header">
                        <div className="modal-task__header_icon" style={{background: colorBackground}}><img src={task.category?.iconKey} alt=""/></div>         
                        <div className="modal-task__header_info">
                            <div className="modal-task__header_title" style={{color: colorCategory}}>{task.category?.name}</div>
                            {(task.createdAt) ? <div className="modal-task__header_subtitle">создано {formatDate(task.createdAt, false)}</div> : null}                
                        </div>     
                        <button className='modal-task__header_edit' onClick={() => onClickEditBtn(task.id)}><EditIcon/></button>
                    </div>
                }
            footer={
                <div className="modal-task__footer">
                    <Button size='modal-btn' variant='transparent' color='#DC2626' onClick={() => onClickDeleteBtn(task.id)}>
                        <DeleteIcon className="modal-task__footer_icon"/> <p className="modal-task__footer_btn">Удалить</p>
                    </Button>
                    <Button size='modal-btn' variant='accent' onClick={() => onClickEditBtn(task.id)}>
                        <EditIcon className="modal-task__footer_icon"/> <p className="modal-task__footer_btn">Редактировать</p> 
                    </Button>
                </div>
            }
            onCloseModal={onCloseModal}>

            <div className="modal-task__body">
                <div className="modal-task__body-info">
                    <Checkbox status={task.status ?? 'TODO'} onToggleStatusTask={changeStatusTask}/>

                    <div className="modal-task__content">
                        <p className={`modal-task__title ${task.status === 'DONE' ? 'modal-task__title-completed': ''}`}>{task.title}</p>
                        <p className="modal-task__subtitle">{task.description}</p>
                    </div>
                </div>

                <div className="modal-task__body-grid">
                    <TaskInfoCard title='статус'>
                        <StatusCard status={task.status ?? 'TODO'}/>
                    </TaskInfoCard>

                    <TaskInfoCard title='приоритет'> 
                        <PriorityCard priority={task.priority}/>
                    </TaskInfoCard>
                    
                    <TaskInfoCard title='срок'> 
                        {
                            task.dueDate 
                            ? <div className={`modal-task__body-time ${(new Date(task.dueDate) < new Date() && task.status !== 'DONE') ? 'modal-task__body-time-expired' : ''}`}>
                                 <CalendarIcon/>
                                 <p>{ task.dueDate ? formatDate(task.dueDate) : '-' }</p>
                              </div>
                            : <div className="modal-task__body-time">
                                 <CalendarIcon/>
                                 <p>{ task.dueDate ? formatDate(task.dueDate) : '-' }</p>
                              </div>
                        }
                    </TaskInfoCard>
                    
                    <TaskInfoCard title='создана'> 
                        {
                            <div className="modal-task__body-time">
                                <CalendarIcon/>
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