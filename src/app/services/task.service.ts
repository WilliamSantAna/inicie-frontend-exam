import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface Task {
    id?: number;
    title: string;
    created_at?: string;
    status: string;
    isEditing?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private uri = 'tasks';

    constructor(private apiService: ApiService) {}

    async getTasks(): Promise<Task[]> {
        return await this.apiService.get<Task[]>(this.uri);
    }

    async createTask(task: Task): Promise<Task> {
        return await this.apiService.post<Task>(this.uri, task);
    }

    async updateTask(task: Task): Promise<Task> {
        return await this.apiService.put<Task>(`${this.uri}/${task.id}`, task);
    }

    async deleteTask(id: number): Promise<void> {
        return await this.apiService.delete<void>(`${this.uri}/${id}`);
    }
}
