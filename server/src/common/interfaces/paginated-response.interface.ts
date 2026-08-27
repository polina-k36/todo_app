export interface IPaginatedResponse<T> {
    page: number;
    limit: number;
    total: number;
    totalPage; number;
    data: T[];
}