import { Component } from '@angular/core';

@Component({
  selector: 'app-check-app',
  standalone: true,
  templateUrl: './check-app.component.html',
})
export class CheckAppComponent {
  status = '{"status":"APP working"}';
}
