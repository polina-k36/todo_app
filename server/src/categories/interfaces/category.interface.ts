export interface ICategory {
    id: number;
    name: string;
    icon?: string | null;
    user_id: number | null | undefined;
    created_at: Date;
    updated_at: Date;
}