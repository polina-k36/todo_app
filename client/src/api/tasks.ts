import type { ICreateTask, IEditTask, IStatsTask, ITask } from "@/types/task.types";
import { request } from "./client";
import type { IGetListResponse, IResponse } from "@/types/api.types";
import type { IApiFiltersTasks } from "@/types/filters.types";


export function getAllTasks(filters?: IApiFiltersTasks, categoryId?: number): Promise<IGetListResponse<ITask>> {  

    let params = '';

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key]) params += params ? `&${key}=${filters[key]}` : `${key}=${filters[key]}`
        })
    }
    if (categoryId) params += params ? `&categoryId=${categoryId}` : `categoryId=${categoryId}`
    
    return request<IGetListResponse<ITask>>({
        path: `/tasks${params ? `?${params}`: ''}`, 
        method: 'GET'
    });
}

export async function getStatsTasks(): Promise<IResponse<IStatsTask>> {
    return request<Promise<IResponse<IStatsTask>>>({
        path: '/tasks/stats',
        method: 'GET'
    })
}


export function getTaskById(id: number): Promise<IResponse<ITask>> {     
    return request<IResponse<ITask>>({
        path: `/tasks/${id}`, 
        method: 'GET'
    });
}


export function completeTask(id: number): Promise<IResponse<ITask>> {     
    return request<IResponse<ITask>>({
        path: `/tasks/${id}/complete`, 
        method: 'POST'
    });
}

export function incompleteTask(id: number): Promise<IResponse<ITask>> {     
    return request<IResponse<ITask>>({
        path: `/tasks/${id}/incomplete`, 
        method: 'POST'
    });
}


export function updateTask(id: number, body: IEditTask): Promise<IResponse<ITask>> {     
    return request<IResponse<ITask>>({
        path: `/tasks/${id}`, 
        method: 'PATCH',
        body
    });
}

export function createTask(body: ICreateTask): Promise<IResponse<ITask>> {     
    return request<IResponse<ITask>>({
        path: `/tasks`, 
        method: 'POST',
        body
    });
}

export function deleteTask(id: number) {     
    return request<never>({
        path: `/tasks/${id}`, 
        method: 'DELETE'
    });
}
