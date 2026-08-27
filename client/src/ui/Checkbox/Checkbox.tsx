import type { TaskStatus } from "@/types/task.types";
import './checkbox.scss';

const Checkbox = ({status, onToggleStatusTask}: {status: TaskStatus, onToggleStatusTask: (checked: boolean) => void}) => {
    return (
        <label className="checkbox">
            <input checked={status === 'DONE'} type="checkbox" 
                   onClick={e => {
                        onToggleStatusTask(e.currentTarget.checked);
                    }}/>
            <span className="checkbox-box">✔</span>
        </label>        
    );
};

export default Checkbox;