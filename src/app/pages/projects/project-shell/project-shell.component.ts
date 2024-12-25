import { Component } from '@angular/core';
import {Mode} from '../../../enum/mode.enum';
import {Project} from '../../../interfaces/project.interface';
import {ProjectListComponent} from '../project-list/project-list.component';
import {ProjectCreateComponent} from '../project-create/project-create.component';
import {ProjectAlertComponent} from '../project-alert/project-alert.component';

@Component({
  selector: 'app-project-shell',
  standalone: true,
  imports: [
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectAlertComponent,
  ],
  templateUrl: './project-shell.component.html',
  styleUrl: './project-shell.component.css'
})
export class ProjectShellComponent {
  protected readonly Mode = Mode;

  mode: Mode = Mode.LIST;
  project: Project|null = null;

  message: string = '';
  title: string = '';
  action: string = '';
  confirmText: string = ''

  modeChange(event: { mode: Mode, project: Project|null, action: string }): void {
    this.mode = event.mode;
    this.project = event.project || null;
    this.action = event.action;

    if (event.action === 'delete'){
      this.confirmText = 'Delete'
      this.title = 'Delete';
      this.message = 'Are you sure you want to delete this project ?'
    } else if (event.action === 'toggle'){
      this.confirmText = 'Toggle'
      this.title = 'Toggle';
      this.message = 'Are you sure you want to toggle the status of this project ?'
    } else if(event.action === 'associated'){
      this.confirmText = 'disable'
      this.title = 'Disable';
      this.message = 'this project is associated you want to disable ?'
    } else if(event.action === 'delete-all') {
      this.confirmText = 'delete All'
      this.title = 'Delete All';
      this.message = 'Are you sure you want to delete all projects ?'
    }
  }
}
