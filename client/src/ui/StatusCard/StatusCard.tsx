
import type { TaskStatus } from '@/types/task.types';
import './status-card.scss'
import { getRUNameByStatus } from '@/utils/transform-name-status';



const StatusCard = ({ status }: {status: TaskStatus}) => {
    const {name, color} = getRUNameByStatus(status) as {name: string, color: string};
    const colorBackground =  `color-mix(in srgb, ${color} 10%, transparent)`;
    return (
        <div className='status-card' 
             style={{
                background: colorBackground, 
                color
             }}>
            {name}
        </div>
    );
};

export default StatusCard;