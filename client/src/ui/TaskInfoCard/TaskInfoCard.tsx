import type { ReactNode } from "react";
import './task-info-card.scss'

interface ITaskInfoCardProps {
    title: string;
    children: ReactNode;
}

const TaskInfoCard = ({title, children}: ITaskInfoCardProps) => {
    return (
        <div className="task-info-card">
            <div className="task-info-card__title">{title}</div>
            <div className="task-info-card__body">{children}</div>            
        </div>
    );
};

export default TaskInfoCard;