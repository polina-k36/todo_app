import type { IGetListResponse, IResponse } from '@/types/api.types';
import type { ICategory } from '@/types/category.types';
import { request } from './client';

export function getAllCategories(): Promise<IGetListResponse<ICategory>> {
  return request<IGetListResponse<ICategory>>({
    path: '/categories',
    method: 'GET',
  });
}

export function getCategoryById(id: number): Promise<IResponse<ICategory>> {
  return request<IResponse<ICategory>>({
    path: `/categories/${id}`,
    method: 'GET',
  });
}

export function createCategory(data: FormData): Promise<IResponse<ICategory>> {
  return request<IResponse<ICategory>>({
    path: '/categories',
    method: 'POST',
    body: data,
  });
}

export function updateCategory(
  id: number,
  data: FormData,
): Promise<IResponse<ICategory>> {
  return request<IResponse<ICategory>>({
    path: `/categories/${id}`,
    method: 'PATCH',
    body: data,
  });
}

export function deleteCategory(id: number) {
  return request<never>({
    path: `/categories/${id}`,
    method: 'DELETE',
  });
}
