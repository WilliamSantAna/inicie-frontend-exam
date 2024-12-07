import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAppComponent } from './check-app/check-app.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', component: TasksComponent },
    { path: 'check-app', component: CheckAppComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
