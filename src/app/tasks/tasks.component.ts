import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule, DragDropModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, HttpClientModule]
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.taskService.getTasks();
  }

  getTask(id: number): Task {
    return this.tasks.find(t => t.id === id)!;
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'pending');
  }

  get inProgressTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'in-progress');
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'completed');
  }

  async updateTaskTitle(task: any): Promise<void> {
    if (task.title.trim() === '') {
      alert('O título da tarefa não pode estar vazio.');
    } else {
      await this.taskService.updateTask(task);
      this.cancelEditing(task);
    }
  }

  enableEditing(task: Task): void {
    this.tasks.forEach(task => this.cancelEditing(task));
    task.isEditing = true;
  }

  cancelEditing(task: Task): void {
    task.isEditing = false;
  }

  async moveTo(status: string, task: Task) {
    task.status = status;
    await this.taskService.updateTask(task);
    await this.loadTasks();
  }
  
  async addTask() {
    const task: Task = { title: 'Nova Tarefa', status: 'pending' };
    await this.taskService.createTask(task);
    await this.loadTasks();
    this.enableEditing(task);
  }

  async deleteTask(taskId: any) {
    if (window.confirm('Certeza que deseja apagar esta tarefa?\nEsta ação não pode ser desfeita')) {
      await this.taskService.deleteTask(taskId);
      await this.loadTasks();
    }
  }
  
  async drop(event: any) {
    const fromList = event.previousContainer.element.nativeElement.className;
    const toList = event.container.element.nativeElement.className;
    const task = this.getTask(event.item.data.id);

    if (fromList.indexOf('pending') > -1 && toList.indexOf('in-progress') > -1) {
      return await this.moveTo('in-progress', task);
    }
    if (fromList.indexOf('in-progress') > -1 && toList.indexOf('completed') > -1) {
      return await this.moveTo('completed', task);
    }
    if (fromList.indexOf('completed') > -1 && toList.indexOf('in-progress') > -1) {
      return await this.moveTo('in-progress', task);
    }
    if (fromList.indexOf('in-progress') > -1 && toList.indexOf('pending') > -1) {
      return await this.moveTo('pending', task);
    }
  }
}
