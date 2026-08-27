import { TaskPriorityEnum, type TaskPriority } from "@/types/task.types";

export const getPriorityByRUName = (namePriority: string): TaskPriority | undefined => {
    switch (namePriority) {
        case TaskPriorityEnum.HIGH:
            return 'HIGH';
            
        case TaskPriorityEnum.MEDIUM:
            return 'MEDIUM';
            
        case TaskPriorityEnum.LOW:
            return 'LOW';
            
        case TaskPriorityEnum.NONE:
            return 'NONE';
    }
}

export const getRUNameByPriority = (priority: TaskPriority | undefined): {name: string, color: string} | undefined => {
    switch (priority) {
        case 'HIGH' :
            return {name: TaskPriorityEnum.HIGH, color: '#DC2626'};
            
        case 'MEDIUM':
            return {name: TaskPriorityEnum.MEDIUM, color: '#D97706'};
            
        case 'LOW':
            return {name: TaskPriorityEnum.LOW, color: '#059669'};
            
        case 'NONE':
            return {name: TaskPriorityEnum.NONE, color: '#0369A1'};
        case undefined:
            return;
    }
}