import ModalInput from "@/ui/ModalFields/ModalInput";
import ModalSelect from "@/ui/ModalFields/ModalSelect";
import ModalTextarea from "@/ui/ModalFields/ModalTextarea";

import './task-form.scss'
import { useEffect, useState } from "react";
import { TaskPriorityEnum, TaskStatusEnum, type ICreateTask, type IEditTask, type ICategoryTask, type ITask} from "@/types/task.types";
import { getPriorityByRUName, getRUNameByPriority } from "@/utils/transform-name-priority";
import { getRUNameByStatus, getStatusByRUName } from "@/utils/transform-name-status";
import type { ICategory } from "@/types/category.types";
import { getAllCategories } from "@/api/categories";

interface ITaskFormProps {
    task?: ITask;
    onSubmitForm: (data: IEditTask | ICreateTask) => void;
}

//доработать обработку данных нормлаьно сделать выпадающие списки чтобы забирать верные данные и хранить верные данные
//обновить типизацию данных и создать апи для тасков
//сделать просто через value убрав selectedValue


const TaskForm = ({task, onSubmitForm}: ITaskFormProps) => {


    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [category, setCategory] = useState<ICategoryTask | null>(task?.category || null);
    const [priority, setPriority] = useState(getRUNameByPriority(task?.priority)?.name || TaskPriorityEnum.NONE);
    const [status, setStatus] = useState(getRUNameByStatus(task?.status)?.name || TaskStatusEnum.TODO);
    const [dueDate, setDueDate] = useState(task?.dueDate || '');
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        getAllCategories().then(data => {
            setCategories(data.data);
            if ( task === undefined ) {
                setCategory(data.data[0]);
            }
        });
    }, [])

    const submitData = (e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();

        const priorityEN = getPriorityByRUName(priority);
        const statusEN = getStatusByRUName(status);
        
        onSubmitForm({
            title, description, 
            categoryId: category?.id, 
            priority: priorityEN, 
            status: statusEN, 
            dueDate: (dueDate === '') ? null : dueDate
        });
    }
    

    return (
        <form id="task-form" className="task-form" onSubmit={submitData}>

            <ModalInput name="title" label="название*" 
                        required value={title}  placeholder="Что нужно сделать?"
                        onChange={e => setTitle(e.currentTarget.value)}/>
            <ModalTextarea name="description" label="описание" 
                           value={description} placeholder="Подробности..."
                           onChange={e => setDescription(e.currentTarget.value)}/>
            <div className="task-form__selects">
                <ModalSelect 
                    name="category" label="категория" 
                    options={categories.map(category => category.name)} value={category?.name}
                    onChange={e => {
                        const category = categories.find(category => category.name === e.currentTarget.value);
                        if (category) setCategory({id: category.id, name: e.currentTarget.value})}}/>
                <ModalSelect 
                    name="priority" label="приоритет" 
                    options={[TaskPriorityEnum.NONE, TaskPriorityEnum.HIGH, TaskPriorityEnum.MEDIUM, TaskPriorityEnum.LOW]} value={priority} 
                    onChange={e => setPriority(e.currentTarget.value)}/>
                <ModalSelect name="status" label="статус" 
                options={[TaskStatusEnum.TODO, TaskStatusEnum.ON_HOLD, TaskStatusEnum.IN_PROGRESS, TaskStatusEnum.DONE, TaskStatusEnum.CANCELLED]} value={status} 
                    onChange={e => setStatus(e.currentTarget.value)}/>
                <ModalInput name="due_date" label="срок" type="datetime-local" value={dueDate.slice(0, 16)} 
                    onChange={e => setDueDate(e.currentTarget.value)}/>
            </div>
           
        </form>

    );
};

export default TaskForm;