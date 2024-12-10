import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private axiosInstance: AxiosInstance;
    private apiUrl: string = 'http://localhost:8080/';

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.fetchCsrfToken();
    }

    async fetchCsrfToken(): Promise<void> {
        await this.axiosInstance.get(`${this.apiUrl}sanctum/csrf-cookie`);
        const response = await this.axiosInstance.get(`${this.apiUrl}csrf-token`);
        const token = response.data?.csrf_token || '';
        if (token) {
            this.axiosInstance.defaults.headers['X-CSRF-TOKEN'] = token;
        }
    }

    async get<T>(url: string): Promise<T> {
        const response = await this.axiosInstance.get(`${url}`);
        return response.data;
    }
    
    async post<T>(url: string, data: any): Promise<T> {
        const response = await this.axiosInstance.post(`${url}`, data);
        return response.data;
    }
    
    async put<T>(url: string, data: any): Promise<T> {
        const response = await this.axiosInstance.put(`${url}`, data);
        return response.data;
    }
    
    async delete<T>(url: string): Promise<T> {
        const response = await this.axiosInstance.delete(`${url}`);
        return response.data;
    }
    
}



export class AxiosService {

  constructor() {
  }

}
