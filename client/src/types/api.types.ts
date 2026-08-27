export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';


export interface IServerErrorResponse {
    success: false;
    error: {
        statusCode: number;
        path: string;
        timestamp: string;
        method: HttpMethod;
        message: string;
        error: string;
    }
}

export interface IRequestConfig  {
    path: string;
    method: HttpMethod;
    body?: unknown;
    headers?: HeadersInit;
}


export interface IGetListResponse<T> {
    success: true;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: T[];
}

export interface IResponse<T> {
    success: true;
    data: T;
}