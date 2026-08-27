export interface IUser {
    id: number;
    name: string;
    login: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
}

export interface IUserUpdate {
    name?: string;
    login?: string;
    passwordHash?: string;
}