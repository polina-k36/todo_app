
export interface IBaseErrorResponse {
    statusCode: number,
    timestamp: string,
    path: string,
    method: string,
    field?: string[],
    message?: string | {[key: string]: unknown}
}