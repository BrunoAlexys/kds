import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/v1/api';

class ApiClient {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token && !config.url?.includes('/auth/')) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log(`[AXIOS] Request para: ${config.baseURL}${config.url}`);
            return config;
        },
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use((response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - perhaps redirect to login?');
                }
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.get(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        console.log("POST Request to:", url, "with data:", data);
        const response: AxiosResponse<T> = await this.api.post(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.put(url, data, config);
        return response.data;
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.patch(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.delete(url, config);
        return response.data;
    }

}

export const apiClient = new ApiClient();