import CategoryButton from '@/ui/CategoryButton/CategoryButton';
import './task-card.scss';
import PriorityCard from '@/ui/PriorityCard/PriorityCard';
import CalendarIcon from '@/assets/icons/icon-calendar.svg?react';
import { formatDate } from '@/utils/format-date';
import EditIcon from '@/assets/icons/icon-edit.svg?react';
import DeleteIcon from '@/assets/icons/icon-delete.svg?react';

import type { ITask} from '@/types/task.types';
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


const TaskCard = ({task, onClickCard, onClickEditBtn, toggleStatusTask, onClickDeleteBtn}: ITaskCardProps) => {

    const {id, title, description, status, priority, category, dueDate} = task;

    const changeStatusTask = (checked: boolean) => {
        toggleStatusTask(id, checked);
    }

    return (
        <div className={`task-card ${task.status === 'DONE' ? 'completed-task' : ''}`} 
              onClick={
                e => {
                    console.log(e.target);
                    if(!(
                        e.target instanceof HTMLButtonElement || 
                        e.target instanceof HTMLSpanElement || 
                        e.target instanceof HTMLInputElement || 
                        e.target instanceof HTMLImageElement ||
                        e.target instanceof SVGElement ||
                        e.target instanceof SVGPathElement)) onClickCard(task.id);
                }
              }>
            <Checkbox status={status} onToggleStatusTask={changeStatusTask}/>

            <div className="task-card__content">
                <p className='task-card__title'>{title}</p>
                <p className="task-card__subtitle">{description}</p> {/* ограничить описание по количеству символом и потом ... */}
                <div className="task-card__info">
                    {category ? <CategoryButton title={category.name} color={category.color} icon={category.iconKey}/> : null}
                    <PriorityCard priority={priority}/>
                    {
                        dueDate 
                        ? 
                        <div className={`task-card__due-time ${(new Date(dueDate) < new Date() && task.status !== 'DONE') ? 'task-card__due-time-expired' : ''}`}>
                            <CalendarIcon/>
                            <p>{formatDate(dueDate)}</p>
                        </div>
                        : null
                    }
                    {
                        status !== 'DONE' ? <StatusCard status={status}/> : null
                    }
                </div>
            </div>

            <div className="task-card__navigate">
                <button className='icon-btn' onClick={ () => onClickEditBtn(id)}>
                    <EditIcon/>
                </button>
                <button className='icon-btn icon-btn-red' onClick={ () => onClickDeleteBtn(id)}><DeleteIcon/></button>
            </div>         
            
        </div>
    );
};

export default TaskCard;
