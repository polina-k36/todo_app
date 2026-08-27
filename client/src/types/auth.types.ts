import type { IUser } from "./user.types";

export type LoginData = {
    login: string;
    password: string;
}

export type RegisterData = {
    name: string;
    login: string;
    password: string;
}

export type AuthMode = 'login' | 'register';

export interface IAuthResponse {
    success: true;
    message: string;
    accessToken: string;
    user: IUser
}