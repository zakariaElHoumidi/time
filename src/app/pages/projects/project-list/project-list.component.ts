import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ProjectService} from '../../../services/Project/project.service';
import {Mode} from '../../../enum/mode.enum';
import {Project} from '../../../interfaces/project.interface';
import {ObjectKeyPipe} from '../../../pipes/object-key.pipe';
import {FormsModule} from '@angular/forms';
import {GroupeService} from '../../../services/Groupe/groupe.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    ObjectKeyPipe,
    FormsModule
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  public readonly projectService = inject(ProjectService);
  public readonly groupService = inject(GroupeService);
  @Output() changeMode: EventEmitter< { mode: Mode, project: Project | null, action: string } > = new EventEmitter< { mode: Mode, project: Project | null, action: string } >();

  filtersByLabel: string = '';
  filtersByStatus: string = '';
  filtersApply: { [key: string]: any }[] = [];
  selectAll: boolean = false;
  projectsSelectedToDelete: number[] = [];

  // Crud
  deleteAll(): void {
    const mode = {
      mode: Mode.CONFIRMATION,
      project: null,
      action: 'delete-all'
    };
    this.changeMode.emit(mode);
  }

  creationProject(project: Project|null): void{
    const mode = {
      mode: Mode.CREATION,
      project: project,
      action: ''
    };

    this.changeMode.emit(mode);
  }

  deleteProject(project: Project): void{
    const mode = {
      mode: Mode.CONFIRMATION,
      project: project,
      action: 'delete'
    };
    this.changeMode.emit(mode);
  }

  applyFilter(): void {
    const filters = [];

    if (this.filtersByLabel) {
      filters.push({ label: this.filtersByLabel });
    }

    if (this.filtersByStatus) {
      filters.push({ status: this.filtersByStatus });
    }

    this.filtersApply = filters;
    this.projectService.filterData(this.filtersApply);
  }

  resetFilter(): void {
    this.filtersByLabel = '';
    this.filtersByStatus = '';
    this.filtersApply = [];

    this.projectService.resetFilter();
  }
  toggleSelectAll(): void {
    const allProjects = this.projectService.projects();
    allProjects.forEach((project: Project) => project.selected = this.selectAll);

    this.projectsSelectedToDelete = this.selectAll ? allProjects.map(project => project.id) : [];
  }

  toggleStatus(project: Project){
    const mode = {
      mode: Mode.CONFIRMATION,
      project: project,
      action: 'toggle'
    };

    this.changeMode.emit(mode);
  }
}
