import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ProjectService} from '../../../services/Project/project.service';
import {Project} from '../../../interfaces/project.interface';
import {Mode} from '../../../enum/mode.enum';
import {TacheService} from '../../../services/Tache/tache.service';

@Component({
  selector: 'app-project-alert',
  standalone: true,
  imports: [],
  templateUrl: './project-alert.component.html',
  styleUrl: './project-alert.component.css'
})
export class ProjectAlertComponent {
  public readonly projectService = inject(ProjectService);
  public readonly tacheService = inject(TacheService);
  @Output() changeMode: EventEmitter< { mode: Mode, project: Project | null, action: string } > = new EventEmitter< { mode: Mode, project: Project | null, action: string } >();

  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Are you sure you want to continue ?';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'No';
  @Input() actionType: string = 'toggle';
  @Input() project: Project|null = null;

  resetMode(): void {
    this.message = '';
    const mode = {
      mode: Mode.LIST,
      project: null,
      action: ''
    };

    this.changeMode.emit(mode);
    this.projectService.removeSelected()
  }

  onConfirm(): void{
    switch (this.actionType) {
      case 'delete':
        this.confirmDelete();
        break;
      case 'toggle':
        this.toggleStatusConfirmation();
        break;
      case 'associated':
        if (this.project?.status === 1){
          this.toggleStatusConfirmation()
        }
        break;
      case 'delete-all':
        this.confirmDeleteAll();
    }
  }

  confirmDelete(): void {
    if (this.project) {
      if (this.tacheService.ifAssocierWithTache(this.project.id)) {
        const mode = {
          mode: Mode.CONFIRMATION,
          project: this.project,
          action: 'associated'
        };
        this.changeMode.emit(mode);
        return;
      }

      this.projectService.deleteProject(this.project.id)
      this.resetMode()
    }
  }

  toggleStatusConfirmation(): void {
    if (this.project) {
      this.projectService.toggleStatus(this.project.id);

      this.resetMode()
    }
  }

  confirmDeleteAll(): void {
    let id_projects: number[] = [];

    const projects = this.projectService.projects()
      .filter((project: Project) => !this.tacheService.ifAssocierWithTache(project.id))

    if (projects.length === 0) {
      this.resetMode();
      return;
    }

    id_projects = projects
      .filter((project: Project) => project.selected)
      .map((project: Project) => project.id );

    this.projectService.deleteProjects(id_projects);
    this.resetMode()
  }
}
