
import type { TaskPriority } from '@/types/task.types';
import './priority-card.scss'
import { getRUNameByPriority } from '@/utils/transform-name-priority';

const PriorityCard = ({ priority }: {priority: TaskPriority}) => {
    const {name, color} = getRUNameByPriority(priority) as {name: string, color: string};
    const colorBackground =  `color-mix(in srgb, ${color} 10%, transparent)`;
    return (
        <div className='priority-card' 
             style={{
                background: colorBackground, 
                color
             }}>
            &bull; {name}
        </div>
    );
};

export default PriorityCard;