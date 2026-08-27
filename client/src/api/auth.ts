import type { IAuthResponse, LoginData, RegisterData } from "@/types/auth.types";
import { request } from "./client";
import type { IResponse } from "@/types/api.types";
import type { IEditInfoUser, IEditPassword, IUser } from "@/types/user.types";


export function login(data: LoginData): Promise<IAuthResponse> {

    return request<IAuthResponse>({
        path: '/auth/login', 
        method: 'POST', 
        body: data
    });

}

export function register(data: RegisterData): Promise<IAuthResponse> {
    
    return request<IAuthResponse>({
        path: '/auth/registration', 
        method: 'POST', 
        body: data
    });    
}

export function getProfileInfo(): Promise<IResponse<IUser>> {
    return request<IResponse<IUser>>({
        path: '/auth/profile',
        method: 'GET'
    })
}

export function updateInfoProfile(data: IEditInfoUser): Promise<IResponse<IUser>>{
    return request<IResponse<IUser>>({
        path: '/auth/profile',
        method: 'PATCH',
        body: data
    })
}

export function updatePassword(data: IEditPassword): Promise<IResponse<IUser>>{
    return request<IResponse<IUser>>({
        path: '/auth/password',
        method: 'PATCH',
        body: data
    })
}