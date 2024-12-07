import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


interface Task {
  id: number;
  title: string;
  createdAt: string;
  status: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule, DragDropModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule]
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  loadTasks(): any {
    this.tasks = [
      { id: 1, title: 'Design da homepage', createdAt: '06/12/2024 08:13', status: 'pending', isEditing: false },
      { id: 2, title: 'Criar layout do painel', createdAt: '06/12/2024 10:45', status: 'pending', isEditing: false },
      { id: 3, title: 'Testar integração com pagamento', createdAt: '06/12/2024 14:20', status: 'pending', isEditing: false },
      { id: 4, title: 'Corrigir bug no login', createdAt: '06/12/2024 09:00', status: 'in-progress', isEditing: false },
      { id: 6, title: 'Corrigir erro no relatório', createdAt: '06/12/2024 15:00', status: 'in-progress', isEditing: false },
      { id: 7, title: 'Escrever documentação', createdAt: '05/12/2024 14:30', status: 'completed', isEditing: false },
      { id: 8, title: 'Implementar autenticação', createdAt: '06/12/2024 13:15', status: 'completed', isEditing: false },
      { id: 9, title: 'Ajustar responsividade', createdAt: '06/12/2024 16:10', status: 'completed', isEditing: false },
      { id: 10, title: 'Migrar banco de dados', createdAt: '06/12/2024 19:00', status: 'completed', isEditing: false },
    ];
  }

  getTask(id: number): any {
    return this.tasks.find(t => t.id === id);    
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

  selectEnabledEditing(event: Event): void {
    const inputElement = (event.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
    setTimeout(() => {
      if (inputElement) {
        inputElement.focus();
        inputElement.select();
      }
    }, 50);
  }

  enableEditing(task: any, event: Event): void {
    task.isEditing = true;
    this.selectEnabledEditing(event);
  }

  updateTaskTitle(task: any): void {
    if (task.title.trim() === '') {
      alert('O título da tarefa não pode estar vazio.');
    } else {
      task.isEditing = false;
    }
  }

  cancelEditing(task: any): void {
    task.isEditing = false;
  }

  moveTo(status: string, task: Task): void {
    task.status = status;
  }
  
  addTask() {
    const newTask = {
      id: this.generateId(),
      title: 'Nova tarefa',
      createdAt: this.getCurrentDateTime(),
      status: 'pending',
      isEditing: false
    };
    this.tasks.push(newTask);
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return now.toLocaleDateString('pt-BR', options);
  }

  private generateId(): number {
    const allTasks = [...this.pendingTasks, ...this.inProgressTasks, ...this.completedTasks];
    return allTasks.length ? Math.max(...allTasks.map(task => task.id)) + 1 : 1;
  }  

  deleteTask(taskId: number): void {
    if (window.confirm('Certeza que deseja apagar esta tarefa?\nEsta ação não pode ser desfeita')) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }
  
  drop(event: any) {
    const fromList = event.previousContainer.element.nativeElement.className;
    const toList = event.container.element.nativeElement.className;
    const task = this.getTask(event.item.data.id);

    if (fromList.indexOf('pending') > -1 && toList.indexOf('in-progress') > -1) {
      return this.moveTo('in-progress', task);
    }
    if (fromList.indexOf('in-progress') > -1 && toList.indexOf('completed') > -1) {
      return this.moveTo('completed', task);
    }
    if (fromList.indexOf('completed') > -1 && toList.indexOf('in-progress') > -1) {
      return this.moveTo('in-progress', task);
    }
    if (fromList.indexOf('in-progress') > -1 && toList.indexOf('pending') > -1) {
      return this.moveTo('pending', task);
    }
  }
}
