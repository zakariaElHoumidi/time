import {Component, inject} from '@angular/core';
import {Project} from '../../../interfaces/project.interface';
import {Mode} from '../../../enum/mode.enum';
import {ProjectService} from '../../../services/Project/project.service';
import {FormsModule} from '@angular/forms';
import {GroupeService} from '../../../services/Groupe/groupe.service';
import {TacheService} from '../../../services/Tache/tache.service';
import {Groupe} from '../../../interfaces/groupe.interface';
import {ObjectKeyPipe} from '../../../pipes/object-key.pipe';
@Component({
  selector: 'app-projects-index',
  standalone: true,
  imports: [
    FormsModule,
    ObjectKeyPipe
  ],
  templateUrl: './projects-index.component.html',
  styleUrl: './projects-index.component.css'
})
export class ProjectsIndexComponent {
  protected readonly Mode = Mode;
  public readonly projectService = inject(ProjectService);
  public readonly groupService = inject(GroupeService);
  public readonly tacheService = inject(TacheService);

  mode: Mode = Mode.LIST;
  project: Project = {
    id: this.generateUniqueID(),
    label: '',
    group_id: null,
    status: 1,
    selected: false
  };
  projectsSelectedToDelete: number[] = [];
  filtersByLabel: string = '';
  filtersByStatus: string = '';
  filtersApply: { [key: string]: any }[] = [];
  groupListActive: Groupe[] = this.groupService.groups().filter((group: Groupe) => group.status === 1);
  projectId: number|null = null;
  projectStatus: number|null = null;
  selectAll: boolean = false;
  generateUniqueID(): number {
    const randomPart = Math.floor(Math.random() * 1000000);
    const timestampPart = Date.now();
    return timestampPart + randomPart;
  }
  addMode(): void {
    this.mode = this.Mode.ADD;
  }

  editMode(project: Project): void {
    this.project = project;
    this.mode = Mode.EDIT;
  }

  resetMode(): void {
    this.mode = Mode.LIST;
    this.project = {
      id: this.generateUniqueID(),
      label: '',
      status: 1,
      selected: false
    }
    this.projectsSelectedToDelete = [];
    this.selectAll = false;
  }

  // Crud
  toggleSelectAll() {
    const allProject = this.projectService.projects();
    allProject.forEach((project: Project) => project.selected = this.selectAll);

    this.projectsSelectedToDelete = this.selectAll ? allProject.map(project => project.id) : [];
  }

  toggleStatus(id_project: number, status_project: number): void {
    this.projectId = id_project;
    this.projectStatus = status_project;
    this.mode = Mode.CONFIRMATION;
  }

  toggleStatusConfirmation($bool: boolean = false): void {
    if ($bool && this.projectId) {
      this.projectService.toggleStatus(this.projectId);

      this.resetMode()
    }
  }
  addProject(): void {
    this.projectService.addToList(this.project);
    this.resetMode()
  }

  editProject(): void {
    this.projectService.updateProject(this.project);
    this.resetMode()
  }

  deleteProject(id_project: number): void{
    this.projectId = id_project;
    this.mode = Mode.DELETE;
  }

  confirmDelete($bool: boolean = false): void {
    if ($bool && this.projectId) {
      if (this.tacheService.ifAssocierWithTache(this.projectId)) {
        this.mode = Mode.ALERT;
        return;
      }

      this.projectService.deleteProject(this.projectId!)
      this.resetMode()
    }
  }


  deleteAll(): void{
    this.mode = Mode.DELETE_ALL;
  }

  confirmDeleteAll($bool: boolean = false): void {
    if ($bool) {
      let id_projects: number[] = [];

      const projects = this.projectService.projects()
        .filter((project: Project) => !this.tacheService.ifAssocierWithTache(project.id))

      if (projects.length === 0) {
        this.mode = Mode.ALERT;
        return;
      }

      id_projects = projects.filter((project: Project) => project.selected).map((project: Project) => project.id );
      this.projectService.deleteProjects(id_projects);
      this.resetSelectedProjects();
      this.resetMode()
    }
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
    this.resetMode();
  }

  resetSelectedProjects(): void {
    this.projectService.projects().forEach((project: Project) => {
      project.selected = false;
    })

    this.projectService.updateLocalStorage()
  }
}
