import type { IRequestConfig, IServerErrorResponse } from "@/types/api.types";
import { ApiError } from "./errors/api-error";
import { tokenStorage } from "./token";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function request<T>(config: IRequestConfig): Promise<T> {
  const fullUrl = BASE_URL + config.path;

  const token = tokenStorage.get();

  const isFormData = config.body instanceof FormData;

  const headers: HeadersInit = {
    Authorization: token ? `Bearer ${token}` : "",
    ...config.headers,
    ...(!isFormData && {
      "Content-Type": "application/json",
    }),
  };

  const options: RequestInit = {
    method: config.method,
    headers,
  };

  if (config.body !== undefined) {
    if (config.body instanceof FormData) {
      options.body = config.body;
    } else {
      options.body = JSON.stringify(config.body);
    }
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    const { error }: IServerErrorResponse = await response.json();

    throw new ApiError(error.message, error.statusCode);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
